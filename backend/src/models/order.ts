import { model, Schema } from 'mongoose'

const OrderSchema = new Schema({
  total_price: {
    type: Number,
    required: true
  },
  obs: {
    type: String,
    default: ''
  },
  state: {
    type: String,
    enum: ['Pendiente', 'En preparación', 'En camino', 'Entregado', 'Cancelado'],
    default: 'Pendiente'
  },
  security_code: {
    type: String,
    required: true
  },
  order_date: {
    type: Date,
    default: Date.now
  },
  delivered_date: {
    type: Date,
    default: null
  },
  products: [
    {
      _id: false,
      product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      subtotal_price: {
        type: Number,
        required: true
      }
    }
  ],
  payment: [
    {
      _id: false,
      payment_method: {
        type: String,
        enum: ['Efectivo', 'Tarjeta de crédito', 'Tarjeta de débito'],
        required: true
      },
      payment_date: {
        type: Date,
        default: Date.now
      },
      amount: {
        type: Number,
        required: true
      },
      state: {
        type: String,
        enum: ['Pendiente', 'Completado', 'Fallido'],
        default: 'Pendiente'
      }
    }
  ],
  shipping_address: {
    address: {
      type: String,
      required: true
    },
    additional_information: {
      type: String,
      default: null
    }
  }
})

export default model('Order', OrderSchema)
