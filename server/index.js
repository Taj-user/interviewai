import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import interviewRouter from "./routes/interview.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use("/api/interview", interviewRouter)

app.get('/', (req, res) => {
  res.json({ message: 'Interview Prep API is running' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})