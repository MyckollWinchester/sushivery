import { model, Schema } from 'mongoose'

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  addresses: [
    {
      _id: false,
      address: {
        type: String,
        required: true
      },
      additional_information: {
        type: String
      }
    }
  ],
  birth: {
    type: Date,
    default: null
  },
  gender: {
    type: String,
    enum: [null, 'Hombre', 'Mujer', 'Prefiero no decir'],
    default: null
  },
  order_history: [
    {
      order_id: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  created_at: {
    type: Date,
    default: Date.now
  }
})

export default model('User', UserSchema)
