'use strict';

const { PROJECT_TABLE, ProjectSchema } = require('../models/proyectos.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(
      PROJECT_TABLE,
      'remaining',
      ProjectSchema.remaining,
    );
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(PROJECT_TABLE, 'remaining');
  },
};
