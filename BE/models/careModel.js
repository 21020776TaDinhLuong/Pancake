import mongoose from 'mongoose'

const careSchema = mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
    },
    staff: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)


const Care = mongoose.model('Care', careSchema)

export default Care
