'use strict';

const { PROJECT_CUSTOMER_TABLE, ProjectCustomerSchema } = require('../models/proyecto-cliente.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(PROJECT_CUSTOMER_TABLE, ProjectCustomerSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(PROJECT_TABLE)
  }
};