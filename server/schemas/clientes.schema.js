const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string();
const last_name = Joi.string();
const company = Joi.string();

const createCustomersSchema = Joi.object({
  id: id.required(),
  name: name.required(),
  last_name: last_name.required(),
  company: company.required(),
});

const updateCustomersSchema = Joi.object({
  id: id,
  name: name,
  last_name: last_name,
  company: company,
});

const getCustomersSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCustomersSchema,
  updateCustomersSchema,
  getCustomersSchema,
};
