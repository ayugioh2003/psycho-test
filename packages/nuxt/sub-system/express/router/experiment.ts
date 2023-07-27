import express from 'express'
import Experiment from '../model/experiment'

const router = express.Router()

router.post('/participant-data', async (req, res) => {
  console.log('req body', req.body)
  console.log('post in!')

  const newExperiment = await Experiment.create(req.body)
  console.log('newExperiment', newExperiment)

  res.json(newExperiment)
})

router.get('/participant-data', async (req, res) => {
  const data = await Experiment.find()
  console.log('data', data)

  res.json(data)
})

router.get('/stroop', async (req, res) => {
  const data = await Experiment.find()
  console.log('data', data)

  res.json(data)
})

export default router
