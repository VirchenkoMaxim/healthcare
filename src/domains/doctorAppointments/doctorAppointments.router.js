const { httpMethods } = require('../../enum/http')
const schema = require('./doctorAppointments.schema')
const { container } = require('../../di-container')

const doctorAppointmentsController = container.resolve('doctorAppointmentsController')

module.exports = {
  basePath: '/doctor-appointments',
  [httpMethods.GET]: [
    {
      url: '/all',
      handler: doctorAppointmentsController.getAll,
      schema: schema.getAll,
    },
    {
      url: '/:id',
      handler: doctorAppointmentsController.getOne,
      schema: schema.getOne,
    },
  ],
  [httpMethods.POST]: {
    url: '/',
    handler: doctorAppointmentsController.createOne,
    schema: schema.createOne,
  },
  [httpMethods.DELETE]: {
    url: '/:id',
    handler: doctorAppointmentsController.deleteOne,
    schema: schema.deleteOne,
  },
}
