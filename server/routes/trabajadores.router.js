const express = require('express');
const router = express.Router();
const WorkerService = require('../services/trabajadores.service');
const service = new WorkerService();

const validatorHandler = require("../middlewares/validator.handler")
const {createWorkersSchema} = require("../schemas/trabajadores.schema")

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
    next(error)
  }
});

router.post('/',validatorHandler(createWorkersSchema, 'body'),async (req, res, next) => {
    try {
      const body = req.body;
      const newWorker = await service.create(body);
      res.status(201).json(newWorker);
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
      res.status(201).json({id});
    } catch (error) {
      next(error)
    }
});

module.exports = router;
