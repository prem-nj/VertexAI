import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import router from "./routes/auth.routes.js"

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config()

const port = process.env.PORT || 8001

app.use("/", router)


app.get("/", (req, res) => {
  res.json({"message":"hello  from auth server"})
})

app.listen(port, async () => {
   await connectDB()
  console.log(`auth server is running on ${port}`)
})