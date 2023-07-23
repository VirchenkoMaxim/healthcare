const { join } = require('path')
const { forEach } = require('lodash')
const { glob } = require('glob')
const { responseWrapper } = require('./wrappers/response')
const { validate } = require('./middlewares/validation')
const swaggerUi = require('swagger-ui-express')
const { composeSwaggerPath, swaggerDef } = require('./openapi')

const swaggerPaths = {}

exports.registerRoutes = (express, { commonPath }) => {
  const data = glob.sync(join(__dirname, './domains/*/*.router.js'))

  forEach(data, (filePath) => {
    const { basePath, ...routes } = require(filePath)
    forEach(routes, (route, method) => {
      const composedPath = `${commonPath}${basePath}`
      Array.isArray(route)
        ? forEach(route, (item) => registerRoute(express, composedPath, method, item))
        : registerRoute(express, composedPath, method, route)
    })
  })

  express.use(`${commonPath}/docs`, swaggerUi.serve, swaggerUi.setup({ ...swaggerDef, paths: swaggerPaths }))
}

const registerRoute = (express, basePath, method, { url: urlChunk, schema, handler }) => {
  const url = composeUrl(basePath, urlChunk)

  express[method](url, validate(schema), responseWrapper(handler))

  const swaggerUrl = url.replace(/:(\w+)/g, '{$1}')

  if (!swaggerPaths[swaggerUrl]) swaggerPaths[swaggerUrl] = {}
  swaggerPaths[swaggerUrl][method] = composeSwaggerPath(schema)
}

const composeUrl = (...args) => args.filter((i) => i !== '/').join('')
