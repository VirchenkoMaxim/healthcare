const moment = require('moment-timezone')
const { getDayOfWeek, saveTimeOnly } = require('../../utils/date')
const ApiError = require('../../utils/ApiError')
const httpStatus = require('http-status')
const { jobNames } = require('../../enum/schedule')
const { notificationTypes } = require('../../enum/notification')

class DoctorAppointmentsService {
  constructor(doctorAppointmentsRepository, doctorsService, usersService, notificationService, scheduleService) {
    this._doctorAppointmentsRepository = doctorAppointmentsRepository

    this._doctorsService = doctorsService
    this._usersService = usersService
    this._notificationService = notificationService
    this._scheduleService = scheduleService

    this._scheduleService.define(jobNames.APPOINTMENT_NOTIFICATION, async ({ appointmentId, notificationType }) =>
      this._notificationService.sendAppointmentNotification(
        notificationType,
        await this._doctorAppointmentsRepository.findOneById(appointmentId, { populate: ['doctor', 'user'] })
      )
    )
  }

  async createOne(body) {
    await this._validateExists(body)

    await this._validateAppointment(await this._doctorsService.getOne(body.doctorId), body)

    const result = await this._doctorAppointmentsRepository.createOne({
      ...body,
      dateOffset: moment.parseZone(body.date).utcOffset(),
    })

    const someHoursBefore = moment(result.date).subtract(2, 'hour')
    if (someHoursBefore.isAfter(moment()))
      this._scheduleService.schedule({
        name: jobNames.APPOINTMENT_NOTIFICATION,
        when: someHoursBefore,
        data: { appointmentId: result.id, notificationType: notificationTypes.SOME_HOURS_BEFORE },
      })

    const someDaysBefore = moment(result.date).subtract(1, 'day')
    if (someDaysBefore.isAfter(moment()))
      this._scheduleService.schedule({
        name: jobNames.APPOINTMENT_NOTIFICATION,
        when: someDaysBefore,
        data: { appointmentId: result.id, notificationType: notificationTypes.SOME_DAYS_BEFORE },
      })

    return result
  }

  async getOne(id, options) {
    return this._doctorAppointmentsRepository.findOneById(id, options)
  }

  async getAll(filter, options) {
    return this._doctorAppointmentsRepository.findList(filter, options)
  }

  async deleteOne(id) {
    const result = await this._doctorAppointmentsRepository.deleteOneById(id)

    await this._scheduleService.removeJobs({ appointmentId: result.id })

    return result
  }

  async _validateExists({ doctorId, userId }) {
    if (doctorId && !(await this._doctorsService.isExists(doctorId)))
      throw new ApiError(httpStatus.BAD_REQUEST, `doctor with id "${doctorId}" not exists`)

    if (userId && !(await this._usersService.isExists(userId)))
      throw new ApiError(httpStatus.BAD_REQUEST, `user with id "${userId}" not exists`)
  }

  async _validateAppointment(doctor, { date, durationMinutes }) {
    if (moment(date).isBefore(moment()))
      throw new ApiError(httpStatus.BAD_REQUEST, 'back dating appointments not allowed')

    const appointmentStartDate = moment(date).utc()
    const appointmentEndDate = moment(date).utc().add(durationMinutes, 'minute')

    if (!this._isAppointmentInWorkingHours(doctor.workingDays, { appointmentStartDate, appointmentEndDate }))
      throw new ApiError(httpStatus.BAD_REQUEST, 'appointment not in doctor working hours')

    const appointmentExists = await this._doctorAppointmentsRepository.findOneByFilter({
      doctorId: doctor.id,
      $or: [
        { date: { $gte: appointmentStartDate, $lt: appointmentEndDate } },
        { _endDate: { $gt: appointmentStartDate, $lte: appointmentEndDate } },
        { date: { $lt: appointmentStartDate }, _endDate: { $gt: appointmentEndDate } },
      ],
    })

    if (appointmentExists) throw new ApiError(httpStatus.BAD_REQUEST, 'appointment overlap with other ones')
  }

  _isAppointmentInWorkingHours = (workingDays, { appointmentStartDate, appointmentEndDate }) => {
    const weekDay = getDayOfWeek(appointmentStartDate)

    const workingHours = workingDays?.[weekDay]

    if (!workingHours) throw new ApiError(httpStatus.BAD_REQUEST, `doctor not work on ${weekDay}`)

    const appointmentStartTime = saveTimeOnly({
      hours: appointmentStartDate.hours(),
      minutes: appointmentStartDate.minutes(),
    })
    const appointmentEndTime = saveTimeOnly({
      hours: appointmentEndDate.hours(),
      minutes: appointmentEndDate.minutes(),
    })

    return workingHours.some(({ from, to }) => {
      const startTime = moment(from)
      const endTime = moment(to)
      return (
        appointmentStartTime.isBetween(startTime, endTime, null, '[]') &&
        appointmentEndTime.isBetween(startTime, endTime, null, '[]')
      )
    })
  }
}

module.exports = DoctorAppointmentsService
