const mongoose = require('mongoose')
const router = require('express').Router()

const auth = require('../utils/auth')
const { isUserAdmin } = require('../utils/checkUser')
const errorHandler = require('../utils/errorHandler')
const Lesson = mongoose.model('Lesson')

router.get('/', async (req, res) => {
  try {
    const lessons = await Lesson.find({})
    res.json(lessons)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: e.message || e })
  }
})

router.post('/', auth.required, isUserAdmin, async (req, res) => {
  const { title } =  req.body

  try {
    let lesson = await Lesson.create({ title })
    res.status(201).json(lesson)
  } catch (e) {
    console.log(e)
    errorHandler(e, res)
  }
})

router.put('/:id', auth.required, isUserAdmin, async (req, res) => {
  const { title } = req.body
  try {
    await Lesson.findOneAndUpdate({ _id: req.params.id }, { title })
    res.json({ message: 'lesson updated' })
  } catch (e) {
    console.log(e)
    errorHandler(e, res)
  }
})

module.exports = router
