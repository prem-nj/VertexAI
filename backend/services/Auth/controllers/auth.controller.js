
import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import userModel from "../model/userModel.js";
import crypto from "crypto"
import redis from "../../../shared/redis/redis.js";

export const login = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        message: "Token is required",
      });
    }

    const decoded = await getAuth(app).verifyIdToken(token);
    let user = await userModel.findOne({
      firebaseUid: decoded.uid
    });

    if (!user) {
      user = await userModel.create({
        firebaseUid: decoded.uid,
        name: decoded.name,
        email: decoded.email,
        avatar:decoded.picture
      })
    }


    const sessionId = crypto.randomUUID()
    
    await redis.set(`session-${sessionId}`, JSON.stringify({
      name: user.name,
       _id: user._id,
      email: user.email,
      avatar:user.avatar
    }),"EX",7*24*60*60)    

    res.cookie("session", sessionId, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge:7*24*60*60*1000
    })
         
    
    
    return res.status(200).json({
      message: "Login successful",
      user,
    });

  } catch (error) {
    console.error("Login error:", error);

    return res.status(401).json({
      message: `Login error: ${error.message}`,
    });
  }
};

export const logout = async (req, res) => {
  try {
    const sessionId=req.Cookies?.session
    await redis.del(`session-${sessionId}`)
    res.clearcookie("session")
  } catch (error) {
    
  }
}