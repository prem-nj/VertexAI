import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import morgan from "morgan"
import cookieParser from "cookie-parser";
import proxy from "express-http-proxy"
dotenv.config()



const app = express()
const port=process.env.PORT || 8000



app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use(cors({
  origin: process.env.FRONTEND_URL,
  Credential:true
}))

app.use("/api/auth",proxy(process.env.AUTH_SERVICE))

app.get("/", (req,res) => {
  res.json({"message":"hello "})
})

app.listen(port,() => {
  console.log(`gateway is running on ${port}`)
})