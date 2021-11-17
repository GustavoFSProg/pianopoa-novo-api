import express from 'express'
import cors from 'cors'
import route from './routes'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const { PORT } = process.env

const app = express()

mongoose.connect(String(process.env.DATABASE))

app.use(express.json())
app.use(cors())
app.use(route)

app.listen(PORT, () => {
  console.log(`Api Runnign on: ${PORT}`)
})

export default app
