const express = require('express');
const router = express.Router();
const CustomersService = require('../services/clientes.service');
const service = new CustomersService();

router.get('/', async(req, res, next) => {
  try {
    const customers = await service.find()
    res.json(customers)
  } catch (error) {
    next(error)
  }
});

router.get('/:id',
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await service.findOne(id);
      res.json(customer);
    } catch (error) {
      next(error)
    }

});

router.post('/',
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCustomer = await service.create(body)
      res.json(newCustomer);
    } catch (error) {
      next(error)
    }

});

router.patch('/:id',
  async (req, res) => {
    try {
      const body = req.body;
      const { id } = req.params;
      const customer = await service.update(id, body)
      res.json(customer);
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
