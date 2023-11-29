const Joi = require("joi")

const id = Joi.string().uuid()
const name = Joi.string()
const last_name = Joi.string()
const age = Joi.number()
const position = Joi.string()
const salary = Joi.number().integer()

const createWorkersSchema = Joi.object({
  id: id.required(),
  name: name.required(),
  last_name: last_name.required(),
  age: age.required(),
  position: position.required(),
  salary: salary.required()
})

module.exports = { createWorkersSchema}
