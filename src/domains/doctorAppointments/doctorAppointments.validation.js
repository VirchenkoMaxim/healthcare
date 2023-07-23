const Joi = require('joi')

exports.getAll = {
  query: Joi.object({
    userId: Joi.string(),
    doctorId: Joi.string(),
  }),
}

exports.getOne = {
  params: Joi.object({ id: Joi.string() }),
}

exports.createOne = {
  body: Joi.object()
    .required()
    .keys({
      userId: Joi.string().required(),
      doctorId: Joi.string().required(),
      date: Joi.string()
        .isoDate()
        .options({ convert: false })
        .required()
        .description('Send date with user timezone offset'),
      durationMinutes: Joi.number().min(20).max(120).required(),
    }),
}

exports.deleteOne = {
  params: Joi.object({ id: Joi.string() }),
}
