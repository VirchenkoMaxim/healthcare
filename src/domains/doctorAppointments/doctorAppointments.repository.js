const { CommonRepository } = require('../../common/common.repository')
const { dbCollectionNames } = require('../../enum/db')
const mongoose = require('mongoose')
const moment = require('moment-timezone')

const DoctorAppointmentsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: dbCollectionNames.USERS },
  doctorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: dbCollectionNames.DOCTORS },
  date: { type: Date, required: true },
  /** used to determine the user's local time */
  dateOffset: { type: Number, required: true },
  durationMinutes: { type: Number, required: true, minimum: 20, maximum: 120 },

  _endDate: { type: Date, required: true, private: true },
})

DoctorAppointmentsSchema.virtual('user', {
  ref: dbCollectionNames.USERS,
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
})

DoctorAppointmentsSchema.virtual('doctor', {
  ref: dbCollectionNames.DOCTORS,
  localField: 'doctorId',
  foreignField: '_id',
  justOne: true,
})

DoctorAppointmentsSchema.set('toObject', { virtuals: true })
DoctorAppointmentsSchema.set('toJSON', { virtuals: true })

/** add "endDate" for appointment overlap checks */
DoctorAppointmentsSchema.pre('validate', function () {
  this.set({ _endDate: moment(this.date).add(this.durationMinutes, 'minutes') })
})

class DoctorAppointmentsRepository extends CommonRepository {
  constructor() {
    super(
      mongoose.model(
        dbCollectionNames.DOCTOR_APPOINTMENTS,
        DoctorAppointmentsSchema,
        dbCollectionNames.DOCTOR_APPOINTMENTS
      )
    )
  }
}

module.exports = DoctorAppointmentsRepository
