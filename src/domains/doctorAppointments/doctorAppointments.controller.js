const autoBind = require('auto-bind')
const httpStatus = require('http-status')
const ApiError = require('../../utils/ApiError')
const { pick } = require('lodash')

class DoctorAppointmentsController {
  constructor(doctorAppointmentsService) {
    autoBind(this)
    this._doctorAppointmentsService = doctorAppointmentsService
  }

  async createOne(request) {
    const result = await this._doctorAppointmentsService.createOne(request.body)
    return { statusCode: httpStatus.CREATED, result: { id: result.id } }
  }

  async deleteOne({ params }) {
    const result = await this._doctorAppointmentsService.deleteOne(params.id)

    if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'doctor appointment not found')

    return { statusCode: httpStatus.OK }
  }

  async getOne({ params }) {
    const result = await this._doctorAppointmentsService.getOne(params.id, { populate: ['doctor', 'user'] })

    if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'doctor appointment not found')

    return { statusCode: httpStatus.OK, result }
  }

  async getAll({ query }) {
    const result = await this._doctorAppointmentsService.getAll(pick(query, ['userId', 'doctorId']), {
      populate: ['doctor', 'user'],
    })
    return { statusCode: httpStatus.OK, result }
  }
}

module.exports = DoctorAppointmentsController
