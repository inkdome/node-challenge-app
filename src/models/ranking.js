import mongoose from 'mongoose'

const tattooerInRankingSchema = new mongoose.Schema({
  _id: mongoose.ObjectId,
  ranking: Number,
  tattooer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tattooer'
  }
})

const rankingSchema = new mongoose.Schema({
  tattooers: [tattooerInRankingSchema],
  province: {
    type: String,
    required: true
  },
  style: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Style',
    required: true
  }
})

export default mongoose.model('Ranking', rankingSchema)
