/* eslint-disable */
import mongoose from 'mongoose'
import 'dotenv/config'
// import dotenv from 'dotenv'
// dotenv.config()

// 遠端資料庫
const DB = (process.env.DATABASE as string).replace(
  '<password>',
  process.env.DATABASE_PASSWORD as string
)

// 連接本地資料庫，這裡留著是方便本地開發切換使用，故不刪除先註解
// const localDB = process.env.DATABASE_LOCAL

export const connectDB = async () => {
  try {
    await mongoose.connect(DB)
    console.log('MongoDB 資料庫連接成功')
  } catch (error) {
    console.log('連接資料庫失敗：', error)
  }
}
