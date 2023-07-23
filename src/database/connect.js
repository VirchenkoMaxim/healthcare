const mongoose = require('mongoose')
const { logger, config } = require('../config')

/** required for discriminator schemas correct filtration */
mongoose.set('strictQuery', false)

const connectToMongo = async () => {
  return mongoose.connect(config.database.url, {
    useNewUrlParser: true,
    serverSelectionTimeoutMS: 5000,
    useUnifiedTopology: true,
  })
}

module.exports = async () =>
  new Promise((resolve) => {
    connectToMongo()
      .then(resolve)
      .catch(() => {})

    mongoose.connection.on('connected', () => {
      logger.info(`Connected to mongodb on ${config.database.url}`)
    })
    mongoose.connection.on('error', (err) => {
      logger.error(err)
      setTimeout(() => {
        connectToMongo()
          .then(resolve)
          .catch(() => {})
      }, 10000)
    })
  })
