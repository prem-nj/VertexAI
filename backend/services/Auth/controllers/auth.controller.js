import {getAuth} from "firebase-admin/auth"
export const login = async (req, res) => {
  try{
  const { token } = req.body();
  const decoded=getAuth(app).verifyIdToken(token)
    return res.json({ decoded });

    
  }catch(error){
    
    return res.status(500).json({messagee:`login error ${error`})
  }
  
}