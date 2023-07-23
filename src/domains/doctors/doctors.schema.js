const validation = require('./doctors.validation')

const tag = 'doctors'

exports.getAll = Object.assign({
  tags: [tag],
  description: 'get all doctors',
})

exports.getOne = Object.assign(
  {
    tags: [tag],
    description: 'get one doctor by id',
  },
  validation.getOne
)

exports.createOne = Object.assign(
  {
    tags: [tag],
    description: 'create one doctor',
  },
  validation.createOne
)

exports.updateOne = Object.assign(
  {
    tags: [tag],
    description: 'update one doctor by id',
  },
  validation.updateOne
)
