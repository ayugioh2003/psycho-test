import mongoose from 'mongoose'

/**
 * User Model
 * 用戶管理模組
 */

const ExperimentSchema = new mongoose.Schema(
  {
    // 暱稱
    user_id: {
      type: String,
      required: [true, '研究參與者代號為必填'],
      minlength: 2,
    },

    // 實驗名稱
    experiment: {
      type: String,
      required: [true, '實驗名稱為必填'],
    },

    // 資料
    data: {
      type: Object,
      required: [true, '實驗資料為必填'],
    },

    // 建立時間，轉為 Timestamp 以方便前端好處理
    createdAt: {
      type: Number,
    },
    // 更新時間，轉為 Timestamp 以方便前端好處理
    updatedAt: {
      type: Number,
    },
  },
  {
    versionKey: false,
    timestamps: {
      currentTime: () => Date.now(),
    },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

const Experiment = mongoose.model('Experiment', ExperimentSchema)

export default Experiment
