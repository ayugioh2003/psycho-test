import mongoose from 'mongoose'
import dayjs from 'dayjs'

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
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

const Experiment = mongoose.model('Experiment', ExperimentSchema)

export default Experiment
