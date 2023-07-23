const validation = require('./doctorAppointments.validation')

const tag = 'doctor appointments'

exports.getAll = Object.assign(
  {
    tags: [tag],
    description: 'get all doctor appointments',
  },
  validation.getAll
)

exports.getOne = Object.assign(
  {
    tags: [tag],
    description: 'get one doctor appointment by id',
  },
  validation.getOne
)

exports.createOne = Object.assign(
  {
    tags: [tag],
    description: 'create one doctor appointment',
  },
  validation.createOne
)

exports.deleteOne = Object.assign(
  {
    tags: [tag],
    description: 'delete one doctor appointment by id',
  },
  validation.deleteOne
)
