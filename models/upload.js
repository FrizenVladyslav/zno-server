const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema(
  {
    path: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

schema.set('toJSON', {
  virtuals: true,
})

module.exports = mongoose.model('Upload', schema)
