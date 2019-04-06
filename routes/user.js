const mongoose = require('mongoose')
const passport = require('passport')
const router = require('express').Router()

const auth = require('../utils/auth')
const User = mongoose.model('User')

//POST new user route (optional, everyone has access)
router.post('/register', auth.optional, (req, res, next) => {
  const { body: { user } } = req

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    })
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    })
  }

  const finalUser = new User(user)
  finalUser.setPassword(user.password)

  return finalUser.save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }))
})

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    })
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    })
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return res.status(400).json({ message: 'Невірна пошта або пароль' })
    }

    if(passportUser) {
      const user = passportUser
      user.token = passportUser.generateJWT()

      return res.json({ token: user.token })
    }

    return status(400).info
  })(req, res, next)
})

router.get('/getUserInfo', auth.required, async (req,res) => {
  const { payload: { id } } = req
  try {
    const user = await User.findById(id)

    if (!user) return res.status(404).json({
      message: 'Користувач не знайден'
    })

    res.json({ ...user.toAuthJSON() })
  } catch (e) {
    console.log(e)
    errorHandler(e, res)
  }
})

//GET current route (required, only authenticated user have access)
router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req

  return User.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400)
      }

      return res.json({ user: user.toAuthJSON() })
    })
})

module.exports = router