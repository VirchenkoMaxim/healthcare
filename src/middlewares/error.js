const { MongooseError } = require('mongoose')
const httpStatus = require('http-status')
const { logger } = require('../config')
const ApiError = require('../utils/ApiError')

// eslint-disable-next-line no-unused-vars
exports.errorHandler = (err, req, res, next) => {
  const { statusCode, message } = _converterError(err)

  const response = { statusCode, message }

  logger.error(err)

  res.status(statusCode).send(response)
}

const _converterError = (err) => {
  if (err instanceof ApiError) return err

  const statusCode = _isDatabaseError(err) ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR

  return new ApiError(statusCode, err.message, err.stack)
}

const _isDatabaseError = (err) => err instanceof MongooseError || err.name === 'MongoServerError'
