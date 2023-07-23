const autoBind = require('auto-bind')
const httpStatus = require('http-status')
const ApiError = require('../../utils/ApiError')

class DoctorsController {
  constructor(doctorsService) {
    autoBind(this)
    this._doctorsService = doctorsService
  }

  async createOne(request) {
    const result = await this._doctorsService.createOne(request.body)
    return { statusCode: httpStatus.CREATED, result: { id: result.id } }
  }

  async updateOne({ params, body }) {
    const result = await this._doctorsService.updateOne(params.id, body)

    if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'doctor not found')

    return { statusCode: httpStatus.OK }
  }

  async getOne({ params }) {
    const result = await this._doctorsService.getOne(params.id)

    if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'doctor not found')

    return { statusCode: httpStatus.OK, result }
  }

  async getAll() {
    const result = await this._doctorsService.getAll()
    return { statusCode: httpStatus.OK, result }
  }
}

module.exports = DoctorsController
