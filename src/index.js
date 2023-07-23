const express = require('express')
const { logger, config } = require('./config')
const { registerRoutes } = require('./app')
const { errorHandler } = require('./middlewares/error')
const { database } = require('./database')
const ApiError = require('./utils/ApiError')
const httpStatus = require('http-status')
const { container } = require('./di-container')

const app = express()

app.use(express.json())

registerRoutes(app, { commonPath: '/api' })

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'URL path not found!'))
})

app.use(errorHandler)

const startServer = () =>
  app.listen(config.apiPort, () => {
    logger.info(`Http server listening at ${config.apiPort}`)
  })

database.connect().then(container.resolve('scheduleService').start).then(startServer)
