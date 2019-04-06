const mongoose = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const { Schema } = mongoose

const UserSchema = new Schema({
  nick: {
    type: String,
    required: 'Укажите имя',
    default: 'Анонім',
  },
  email: {
    type: String,
    required: 'Укажите e-mail',
    unique: 'Такой e-mail уже существует'
  },
  role: {
    type: String,
    default: 'user'
  },
  hash: String,
  salt: String,
})

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
}

UserSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
  return this.hash === hash
}

UserSchema.methods.generateJWT = function() {
  const today = new Date()
  const expirationDate = new Date(today)
  expirationDate.setDate(today.getDate() + 60)

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret')
}

UserSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    nick: this.nick,
    role: this.role,
    token: this.generateJWT(),
  }
}

mongoose.model('User', UserSchema)