const { httpMethods } = require('../../enum/http')
const { container } = require('../../di-container')
const schema = require('./users.schema')
const usersController = container.resolve('usersController')

module.exports = {
  basePath: '/users',
  [httpMethods.GET]: [
    {
      url: '/all',
      handler: usersController.getAll,
      schema: schema.getAll,
    },
    {
      url: '/:id',
      handler: usersController.getOne,
      schema: schema.getOne,
    },
  ],
  [httpMethods.POST]: {
    url: '/',
    handler: usersController.createOne,
    schema: schema.createOne,
  },
  [httpMethods.PUT]: {
    url: '/:id',
    handler: usersController.updateOne,
    schema: schema.updateOne,
  },
}
