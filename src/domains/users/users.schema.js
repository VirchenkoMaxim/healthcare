const validation = require('./users.validation')

const tag = 'users'

exports.getAll = Object.assign({
  tags: [tag],
  description: 'get all users',
})

exports.getOne = Object.assign(
  {
    tags: [tag],
    description: 'get one user by id',
  },
  validation.getOne
)

exports.createOne = Object.assign(
  {
    tags: [tag],
    description: 'create one user',
  },
  validation.createOne
)

exports.updateOne = Object.assign(
  {
    tags: [tag],
    description: 'update one user by id',
  },
  validation.updateOne
)
