const Joi = require('joi')
const { weekDays } = require('../../enum/date')
const { timeRegex } = require('../../enum/regex')

const workingHours = Joi.array().items(
  Joi.object().keys({
    from: Joi.string().isoDate().regex(timeRegex).required().example('1970-01-01T09:00:00.000Z'),
    to: Joi.string().isoDate().regex(timeRegex).required().example('1970-01-01T18:00:00.000Z'),
  })
)

const workingDays = Joi.object()
  .keys(Object.fromEntries(weekDays.map((weekDay) => [weekDay, workingHours])))
  .min(1)

exports.getOne = {
  params: Joi.object({ id: Joi.string() }),
}

exports.createOne = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().required(),
      speciality: Joi.string().required(),
      workingDays: workingDays.min(1),
    }),
}

exports.updateOne = {
  params: Joi.object({ id: Joi.string() }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      speciality: Joi.string(),
    })
    .min(1),
}
