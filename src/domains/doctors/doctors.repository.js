const { CommonRepository } = require('../../common/common.repository')
const mongoose = require('mongoose')
const { dbCollectionNames } = require('../../enum/db')
const { weekDays } = require('../../enum/date')

const workingHours = new mongoose.Schema(
  {
    from: { type: Date, required: true },
    to: { type: Date, required: true },
  },
  { _id: false }
)

const workingDaysSchema = new mongoose.Schema(
  Object.fromEntries(weekDays.map((weekDay) => [weekDay, { type: [workingHours], default: undefined }])),
  { _id: false }
)

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  speciality: { type: String, required: true },
  workingDays: { type: workingDaysSchema, default: undefined },
})

class DoctorsRepository extends CommonRepository {
  constructor() {
    super(mongoose.model(dbCollectionNames.DOCTORS, DoctorSchema, dbCollectionNames.DOCTORS))
  }
}

module.exports = DoctorsRepository
