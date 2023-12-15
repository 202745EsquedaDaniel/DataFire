const Joi = require('joi');

const id = Joi.number().integer()
const name = Joi.string();
fecha_inicio = Joi.date();
fecha_fin = Joi.date();
costo = Joi.number().integer();

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

module.exports = {
  createProjectsSchema,
  updateProjectSchema,
  getProjectSchema,
};
