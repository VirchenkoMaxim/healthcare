const { httpMethods } = require('../../enum/http')
const schema = require('./doctors.schema')
const { container } = require('../../di-container')

const doctorsController = container.resolve('doctorsController')

module.exports = {
  basePath: '/doctors',
  [httpMethods.GET]: [
    {
      url: '/all',
      handler: doctorsController.getAll,
      schema: schema.getAll,
    },
    {
      url: '/:id',
      handler: doctorsController.getOne,
      schema: schema.getOne,
    },
  ],
  [httpMethods.POST]: {
    url: '/',
    handler: doctorsController.createOne,
    schema: schema.createOne,
  },
  [httpMethods.PUT]: {
    url: '/:id',
    handler: doctorsController.updateOne,
    schema: schema.updateOne,
  },
}
