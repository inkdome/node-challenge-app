import mongoose from 'mongoose'

const worksInSchema = new mongoose.Schema({
  secondaryProvinces: [String],
  enabled: Boolean,
  province: String
})

const tattooerSchema = new mongoose.Schema({
  fullName: String,
  bw: Boolean,
  color: Boolean,
  description: String,
  email: String,
  igLink: String,
  image: String,
  phone: String,
  worksIn: [worksInSchema]
})

export default mongoose.model('Tattooer', tattooerSchema)
