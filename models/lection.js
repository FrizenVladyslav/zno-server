const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  title: {
    type: String,
    required: 'Заголовок обязательный',
  },
  draft: {
    type: Boolean,
    default: true,
  },
  section: {
    type: Schema.Types.ObjectId,
    ref: 'Section',
    required: true,
  },
  lesson: {
    type: Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true,
  },
  content: {
    type: 'String',
    default: '',
  }
})

module.exports= mongoose.model('Lection', schema)
