import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"
import router from "./routes/project.routes.js";
dotenv.config()

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))


app.use("/",router)
app.get("/", (req, res) => {
  res.json({"message":"we are in project service"})
})


app.listen(process.env.PORT || 8002, () => {

  connectDB()
  
  console.log(`project server is running .. on ${process.env.PORT || 8002}`)
})