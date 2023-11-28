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
    const worker = await service.findOne(id);
    res.json(worker);
  } catch(error) {
    console.error(error)
  }
});

router.post('/',
  async (req, res, next) => {
    try {
      const body = req.body;
      const newWorker = await service.create(body);
      res.json(newWorker);
    } catch (error) {
      next(error)
    }

});

router.patch('/:id',
  async (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.params;
      const worker = await service.update(id, body)
      res.json(worker);
    } catch (error) {
      next(error)
    }

});

router.delete('/:id',
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id)
      res.json({id});
    } catch (error) {
      next(error)
    }
});

module.exports = router;
