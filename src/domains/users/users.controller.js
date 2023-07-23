const autoBind = require('auto-bind')
const httpStatus = require('http-status')
const ApiError = require('../../utils/ApiError')

class UsersController {
  constructor(usersService) {
    autoBind(this)
    this._usersService = usersService
  }

  async createOne({ body }) {
    const result = await this._usersService.createOne(body)
    return { statusCode: httpStatus.CREATED, result: { id: result.id } }
  }

  async updateOne({ params, body }) {
    const result = await this._usersService.updateOne(params.id, body)

    if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'user not found')

    return { statusCode: httpStatus.OK }
  }

  async getOne({ params }) {
    const result = await this._usersService.getOne(params.id)

    if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'user not found')

    return { statusCode: httpStatus.OK, result }
  }

  async getAll() {
    const result = await this._usersService.getAll()
    return { statusCode: httpStatus.OK, result }
  }
}

module.exports = UsersController
