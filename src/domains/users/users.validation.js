const Joi = require('joi')

const phone = Joi.string()
  .length(10)
  .pattern(/^[0-9]+$/)

exports.getOne = {
  params: Joi.object({
    id: Joi.string(),
  }),
}

exports.createOne = {
  body: Joi.object().required().keys({
    name: Joi.string().required(),
    phone,
  }),
}

exports.updateOne = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      phone,
    })
    .min(1),
}
