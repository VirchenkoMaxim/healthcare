const ApiError = require('../utils/ApiError')

exports.responseWrapper = (fn) => async (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .then((response) => {
      if (!response) return undefined

      const { statusCode = 200, result, message } = response

      if (_isApiError(statusCode)) return next(new ApiError(statusCode, message))

      return res.status(statusCode).send(result)
    })
    .catch(next)
}

const _isApiError = (status) => status >= 400
