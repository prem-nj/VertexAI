
import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import userModel from "../model/userModel.js";

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

    return res.status(200).json({
      message: "Login successful",
      decoded,
    });

  } catch (error) {
    console.error("Login error:", error);

    return res.status(401).json({
      message: `Login error: ${error.message}`,
    });
  }
};
