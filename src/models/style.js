import mongoose from 'mongoose'

const styleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: String,
  description: String,
  showName: String
})

const model = mongoose.model('Style', styleSchema)
export default model
