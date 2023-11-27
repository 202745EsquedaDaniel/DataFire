const express = require('express');
const router = express.Router();
const WorkerService = require('../services/trabajadores.service');
const service = new WorkerService();

router.get('/', (req, res) => {
  res.send(service.workers);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const worker = service.findOne(id);
  res.json(worker);
});

router.post('/', (req, res) => {
  const body = req.body;
  const newWorker = service.create(body);
  res.json(newWorker);
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
