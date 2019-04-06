const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  title: {
    type: String,
    required: 'Заголовок обязательный'
  }
})

mongoose.model('Lesson', schema)
