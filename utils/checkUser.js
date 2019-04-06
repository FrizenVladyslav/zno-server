const mongoose = require('mongoose')

const User = mongoose.model('User')

async function isUserValid(req, res, next) {
  const { payload: { id } } = req
  try {
    const user = await User.findById(id)
    if (user) next()
    else res.sendStatus(401)
  } catch (e) {
    res.status(500).json({ message: e.message || e })
  }
}

async function isUserAdmin(req, res, next) {
  const { payload: { id } } = req
  try {
    const user = await User.findById(id)
    if (user && user.role === 'admin') next()
    else res.status(400).json({ message: 'Admin only' }) 
  } catch (e) {
    res.status(500).json({ message: e.message || e })
  }
}



module.exports = {
  isUserValid,
  isUserAdmin,
}

