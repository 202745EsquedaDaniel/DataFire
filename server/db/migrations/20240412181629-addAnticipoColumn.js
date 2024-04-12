'use strict';

const { PROJECT_TABLE, ProjectSchema } = require('../models/proyectos.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(
      PROJECT_TABLE,
      'anticipo',
      ProjectSchema.anticipo,
    );
    await queryInterface.addColumn(
      PROJECT_TABLE,
      'presupuesto',
      ProjectSchema.presupuesto,
    );
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(PROJECT_TABLE, 'anticipo');
    await queryInterface.removeColumn(PROJECT_TABLE, 'presupuesto');
  },
};
