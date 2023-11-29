const express = require('express');
const router = express.Router();
const ProjectService = require('../services/proyectos.service');
const service = new ProjectService();

const validatorHandler = require("../middlewares/validator.handler")
const {createProjectsSchema} = require("../schemas/proyectos.schema")

router.get('/', async(req, res, next) => {
  try {
    const projects = await service.find()
    res.json(projects)
  } catch (error) {
    next(error)
  }
});

router.get('/:id',
async (req, res, next) => {
  try{
    const { id } = req.params;
    const project = await service.findOne(id)
    res.json(project);
  } catch (error) {
    next(error)
  }
});

router.post('/',
  validatorHandler(createProjectsSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProject = service.create(body);
      res.status(201).json(newProject);
    } catch (error) {
      next(error)
    }

});

router.patch('/:id',
async (req, res, next) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const project = service.update(id, body)
    res.json(project);
  } catch (error) {
    next(error)
  }

});

router.delete('/:id',
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id)
      res.status(201).json({id});
    } catch (error) {
      next(error)
    }
});


module.exports = router;
