import express from 'express'
import Experiment from '../model/experiment'

const router = express.Router()

router.post('/participant-data', async (req, res) => {
  const newExperiment = await Experiment.create(req.body)
  res.json(newExperiment)
})

router.get('/participant-data', async (req, res) => {
  const { query } = req
  const experiment = query.experiment ? { experiment: query.experiment } : {}

  const data = await Experiment.find({ ...experiment })

  res.json(data)
})

router.get('/stroop-data', async (req, res) => {
  const { query } = req
  const experiment = { experiment: 'stroop' }
  let dataList = (await Experiment.find({ ...experiment })) as any

  dataList = dataList
    // 只留正式實驗的 response、取需要的欄位
    .map((data: any) => {
      const id = data.id
      const userId = data.user_id

      const trials = data.data
        // 只留正式實驗的 response
        .filter((attr: any) => attr.task === 'response')
        // 取需要的欄位
        .map((attr: any) => ({
          id,
          userId,
          correct: attr.correct,
          consistency: attr.consistency,
          elementType: attr.elementType,
          rt: attr.rt,
        }))
      return trials
    })
    // 清理資料 - hash
    .map((data: any) => {
      const hash = {}

      for (let obj of data) {
        let hashKey = `${obj.consistency}-${obj.elementType}`

        // 刪除答題錯誤的資料
        if (!obj.correct) {
          hash[hashKey] = {
            id: obj.id,
            userId: obj.userId,
            consistency: obj.consistency,
            elementType: obj.elementType,
            rt: 0,
            count: 0,
          }
          continue
        }

        // hash 計算
        if (!hash[hashKey]) {
          hash[hashKey] = {
            id: obj.id,
            userId: obj.userId,
            consistency: obj.consistency,
            elementType: obj.elementType,
            rt: obj.rt,
            count: 1,
          }
        } else {
          hash[hashKey] = {
            id: obj.id,
            userId: obj.userId,
            consistency: obj.consistency,
            elementType: obj.elementType,
            rt: hash[hashKey].rt + obj.rt,
            count: hash[hashKey].count + 1,
          }
        }
      }

      return hash
    })
    // 整理成 csv 可接受的格式
    .map((data: any) => {
      // 計算這位受試者 RT 平均值，之後用來替換掉遺漏值
      const countInfo = Object.values(data).reduce(
        (acc: any, cur: any) => {
          acc.rt += cur.rt
          acc.count += cur.count
          return acc
        },
        { rt: 0, count: 0 }
      ) as any
      const averageRtByAllTrails = countInfo.rt / countInfo.count

      // 轉成陣列
      const list = Object.values(data).map((obj: any) => {
        const averageRtByLevel = obj.rt / obj.count
        return {
          id: obj.id,
          userId: obj.userId,
          consistency: obj.consistency,
          elementType: obj.elementType,
          rt: obj.count > 0 ? averageRtByLevel : averageRtByAllTrails,
          totalRt: obj.rt,
          count: obj.count,
        }
      })

      return list
    })

  res.json(dataList)
})

export default router
