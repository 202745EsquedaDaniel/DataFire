const Joi = require('joi');

const id = Joi.number().integer()
const name = Joi.string();
fecha_inicio = Joi.date();
fecha_fin = Joi.date();
costo = Joi.number().integer();
const abono = Joi.number().integer().min(1)
const projectId = Joi.number().integer()
const customerId = Joi.number().integer()

const createProjectsSchema = Joi.object({
  name: name.required(),
  fecha_inicio: fecha_inicio.required(),
  fecha_fin: fecha_fin.required(),
  costo: costo.required()
});

const updateProjectSchema = Joi.object({
  id: id,
  name: name,
  fecha_inicio: fecha_inicio,
  fecha_fin: fecha_fin,
  costo: costo
});

const getProjectSchema = Joi.object({
  id: id.required(),
});

const addCustomerRESchema = Joi.object({
  abono: abono.required(),
  projectId: projectId.required(),
  customerId: customerId.required()
})

module.exports = {
  createProjectsSchema,
  updateProjectSchema,
  getProjectSchema,
  addCustomerRESchema
};
