import express from 'express'
import { fromNodeMiddleware } from 'h3'

const app = express()

app.get('/', (req, res) => {
  res.json({
    text: 'hello from express monorepo'
  })
})

app.get('/:name', (req, res) => {
  res.send(`hello from express, ${req.params.name}`)
})

export default fromNodeMiddleware(app)