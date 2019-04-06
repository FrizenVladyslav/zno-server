const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  title: {
    type: String,
    required: 'Заголовок обязательный'
  },
  lesson: {
    type: Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true,
  },
  lectionsCount: {
    type: Number,
    default: 0,
  }
})

schema.static('changeLectionsCount', async function sectionId(sectionId, inc = true) {
    console.log('draft', this.draft)
    return await this.findByIdAndUpdate(
      sectionId,
      { $inc: { lectionsCount: inc ? 1 : -1 } },
      { new: true }
    )
  }
)

module.exports = mongoose.model('Section', schema)
