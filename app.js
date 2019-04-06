const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')
const errorHandler = require('errorhandler')

const path = require('path')
const database = require('./database')
const config = require('./config')

const app = express()

//Config app
app.use(cors())
app.use(require('morgan')(config.IS_PODUCTION ? 'tiny' : 'dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({ secret: 'zno-progect', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }))
app.use('/api/uploads', express.static(path.join(__dirname, config.DESTINATION)))


if (!config.IS_PODUCTION) {
  app.use(errorHandler())
}

//routes && models
require('./models')
require('./utils/password')
app.use('/api/user', require('./routes/user'))

app.use('/api/upload', require('./routes/upload'))
app.use('/api/lesson', require('./routes/lesson'))
app.use('/api/section', require('./routes/section'))
app.use('/api/lection', require('./routes/lection'))

//catch 404 && forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})   

//error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.send({
    message: error.message,
    error: !config.IS_PODUCTION ? error : {}
  })
})

app.listen(config.PORT, () => console.log(`Server listening on port ${config.PORT}`))
