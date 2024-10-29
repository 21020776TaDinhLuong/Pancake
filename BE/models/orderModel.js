import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
  {
    user: {
      type: String,
      default:'Example User'
    },
    orderItems: {
      type: String,
      default:''
    },
    shippingAddress: {
      type: String,
      default:''
    },
    paymentMethod: {
      type: String,
      default:'',
    },
    paymentResult: {
      type: String,
      default:''
    },
    taxPrice: {
      type: Number,
      default: 0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order
