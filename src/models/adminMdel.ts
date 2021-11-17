import { model, Schema } from 'mongoose'

const schema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
  },
})

export default model('adminModel', schema)
