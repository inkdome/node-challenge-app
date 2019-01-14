import mongoose from 'mongoose'
import isUrl from 'is-url'
import { validate as isEmail } from 'isemail'

const worksInSchema = new mongoose.Schema({
  secondaryProvinces: [String],
  enabled: Boolean,
  province: {
    type: String,
    required: true
  }
})

const tattooerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    reqired: true
  },
  bw: {
    type: Boolean,
    required: true
  },
  color: {
    type: Boolean,
    required: true
  },
  description: String,
  email: {
    type: String,
    validate: {
      validator: value => !value || isEmail(value),
      message: props => `${props.value} is not a valid e-mail address`
    }
  },
  igLink: {
    type: String,
    required: true,
    validate: {
      validator: value => (
        isUrl(value) && value.match(/^https?:\/\/(?:www\.)?instagram\.com\/.+$/)
      ),
      message: props => `${props.value} is not a valid Instangram URL`
    }
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: value => isUrl(value),
      message: props => `${props.value} is not a valid URL`
    }
  },
  phone: String,
  worksIn: [worksInSchema]
})

export default mongoose.model('Tattooer', tattooerSchema)
