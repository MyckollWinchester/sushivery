import { model, Schema } from 'mongoose'
import Product from './product';

const OrderSchema = new Schema({
  total_price: {
    type: Number,
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

OrderSchema.pre('save', async function (next) {
  if (this.products && Array.isArray(this.products)) {
    for (const item of this.products) {
      if (item.product_id) {
        const product = await Product.findById(item.product_id);
        if (product) {
          const price = product.offer_price !== undefined && product.offer_price !== null
            ? product.offer_price
            : product.reference_price;
          item.subtotal_price = price * item.quantity;
        }
      }
    }
    this.total_price = this.products.reduce((sum, item) => sum + (item.subtotal_price || 0), 0);
  }
  next();
});


export default model('Order', OrderSchema)
