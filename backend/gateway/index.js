import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import morgan from "morgan"
import cookieParser from "cookie-parser";
import proxy from "express-http-proxy"
import { protect } from "./middleware/protect.js";
import { getCurrentUser } from "./controllers/user.controllers.js";

dotenv.config()



const app = express()
const port=process.env.PORT || 8000



app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));


app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials:true
}))

app.use("/api/auth",proxy(process.env.AUTH_SERVICE))
app.get("/api/me",protect,getCurrentUser)

app.get("/", (req,res) => {
  res.json({"message":"hello "})
})

app.listen(port,() => {
  console.log(`gateway is running on ${port}`)
})