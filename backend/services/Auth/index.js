import express from "express"
import dotenv from "dotenv"
const app = express()

dotenv.config()

const port = process.env.PORT || 8001

app.get("/", (req, res) => {
  res.json({"message":"hello  from auth server"})
})

app.listen(port, () => {
  console.log(`auth server is running on ${port}`)
})