// https://stackoverflow.com/questions/62287709/environment-variable-with-dotenv-and-typescript
import 'dotenv/config'
import express from 'express'

import { connectDB } from './db'
import router from './router'

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', router)

export default fromNodeMiddleware(app)
