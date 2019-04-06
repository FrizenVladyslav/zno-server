const config = require('./config')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.set('debug', config.IS_PODUCTION)

mongoose.connection
    .on('error', error => console.error(error))
    .on('close', () => console.log('DB connection closed'))
    .once('open', () => {
      const { host, port, name } = mongoose.connection
      console.log(`Connected to ${host}:${port}/${name}`)
    })

mongoose.connect(config.MONGO_URL, { useNewUrlParser: true })

module.exports = mongoose.connection