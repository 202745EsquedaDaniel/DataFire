const express = require('express');
const router = express.Router();
const WorkerService = require('../services/trabajadores.service');
const service = new WorkerService();

router.get('/', async(req, res, next) => {
  try {
    const workers = await service.find()
    res.json(workers)
  } catch (error) {
    next(error)
  }
});

router.get('/:id', async (req, res,next) => {
  try {
    const { id } = req.params;
    const worker = service.findOne(id);
    res.json(worker);
  } catch(error) {
    console.error(error)
  }
});

router.post('/', (req, res) => {
  const body = req.body;
  const newWorker = service.create(body);
  res.json(newWorker);
});

router.patch('/:id', (req, res) => {
  const body = req.body;
  const { id } = req.params;
  const worker = service.update(id, body)
  res.json(worker);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  service.delete(id)
  res.json({id});
});

module.exports = router;
