const mongoose = require('mongoose')
const router = require('express').Router()

const auth = require('../utils/auth')
const { isUserAdmin } = require('../utils/checkUser')
const errorHandler = require('../utils/errorHandler')
const Lection = mongoose.model('Lection')
const Section = mongoose.model('Section')

router.get('/:id', async (req, res) => {
  try {
    const lection = await Lection.findOne({ _id: req.params.id })
    .populate('section')
    .populate('lesson')

    res.json(lection)
  } catch (e) {
    errorHandler(e, res)
  }
  
})

router.post('/getAllLections', async (req, res) => {
  try {
    const lections = await Lection.find(req.body)
    res.json(lections)
  } catch (e) {
    console.log(e)
    errorHandler(e, res)
  }
})

router.post('/', auth.required, isUserAdmin, async (req, res) => {
  const { title, lessonId, sectionId } = req.body
  try {
    let lection = await Lection.create({
      title,
      lesson: lessonId,
      section: sectionId
    })

    res.status(201).json(lection)
  } catch (e) {
    console.log(e)
    errorHandler(e, res)
  }
})

router.put('/:id', auth.required, isUserAdmin, async (req, res) => {
  const { title, draft, content } = req.body
  try {
    let lection = await Lection.findById(req.params.id)

    if (lection.draft !== draft)
      await Section.changeLectionsCount(lection.section, !draft)

    lection = Object.assign(lection, { title, draft, content })
    await lection.save()

    res.json({ message: 'Lection updated' })
  } catch (e) {
    console.log(e)
    errorHandler(e, res)
  }
})

module.exports = router
