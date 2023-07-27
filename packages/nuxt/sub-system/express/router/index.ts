import express from 'express'
import experimentRouter from './experiment'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    text: 'hello from express',
  })
})

router.get('/:name', (req, res) => {
  res.send(`hello from express, ${req.params.name}`)
})

router.use('/experiment', experimentRouter)

export default router
