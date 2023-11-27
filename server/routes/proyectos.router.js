const express = require('express');
const router = express.Router();
const ProjectService = require('../services/proyectos.service');
const service = new ProjectService();

router.get('/', (req, res) => {
  res.send(service.projects);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const project = service.findOne(id);
  res.json(project);
});

router.post('/', (req, res) => {
  const body = req.body;
  const newProject = service.create(body);
  res.json(newProject);
});

router.patch('/:id', (req, res) => {
  const body = req.body;
  const { id } = req.params;
  res.json({
    message: 'updated',
    data: body,
    id,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'deleted',
    id,
  });
});

module.exports = router;
