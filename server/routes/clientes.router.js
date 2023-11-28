const express = require('express');
const router = express.Router();
const CustomersService = require('../services/clientes.service');
const service = new CustomersService();

router.get('/', (req, res) => {
  res.json(service.customers);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const customer = service.findOne(id);
  res.json(customer);
});

router.post('/', (req, res) => {
  const body = req.body;
  const newCustomer = service.create(body)
  res.json(newCustomer);
});

router.patch('/:id', (req, res) => {
  const body = req.body;
  const { id } = req.params;
  const customer = service.update(id, body)
  res.json(customer);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  service.delete(id)
  res.json({id});
});



module.exports = router;
