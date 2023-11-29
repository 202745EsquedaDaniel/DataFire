const Joi = require("joi")

const id = Joi.string().uuid()
const name = Joi.string()
const last_name = Joi.string()
const company = Joi.string()

const createCustomersSchema = Joi.object({
  id: id.required(),
  name: name.required(),
  last_name: last_name.required(),
  company: company.required(),
})

module.exports = {createCustomersSchema}
