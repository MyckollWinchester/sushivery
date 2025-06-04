import { model, Schema } from 'mongoose'

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  reference_price: {
    type: Number,
    required: true
  },
  offer_price: Number,
  category: {
    type: String,
    enum: ['Promociones', 'Tablas', 'Handrolls', 'Bebidas', 'Salsas'],
    required: true
  },
  image: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  price_history: [
    {
      _id: false,
      amount: {
        type: Number,
        required: true
      },
      is_offer: {
        type: Boolean,
        default: false
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
})

export default model('Product', ProductSchema)
