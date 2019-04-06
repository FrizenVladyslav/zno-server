const dotenv = require('dotenv')
const path = require('path')

const root = path.join.bind(this, __dirname)
dotenv.config({ path: root('.env') })

module.exports = {
  PORT: process.env.PORT || 8080,
  MONGO_URL: 'mongodb://localhost:27017/zno',
  IS_PODUCTION: process.env.NODE_ENV === 'production',
  DESTINATION: 'uploads',
}