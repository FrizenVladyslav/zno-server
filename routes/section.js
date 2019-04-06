const mongoose = require('mongoose')
const router = require('express').Router()

const auth = require('../utils/auth')
const { isUserAdmin } = require('../utils/checkUser')
const errorHandler = require('../utils/errorHandler')
const Section = mongoose.model('Section')
const Lection = mongoose.model('Lection')

router.get('/', async (req, res) => {
  const { lessonId: lesson } = req.query
  const conditions = lesson ? { lesson } : {} 
  try {
    let sections = await Section.find(conditions)
    res.json(sections)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: e.message || e }) 
  }
})  


router.post('/', auth.required, isUserAdmin, async (req, res) => {
  const { title, lessonId } = req.body
  try {
    let section = await Section.create({ title, lesson: lessonId })
    res.status(201).json(section)
  } catch (e) {
    console.log(e)
    errorHandler(e, res)
  }
})

router.put('/:id', auth.required, isUserAdmin, async (req, res) => {
  const { title } = req.body
  try {
    await Section.findOneAndUpdate({ _id: req.params.id }, { title })
    res.json({ message: 'Section updated' })
  } catch (e) {
    console.log(e)
    errorHandler(e, res)
  }
})

module.exports = router
