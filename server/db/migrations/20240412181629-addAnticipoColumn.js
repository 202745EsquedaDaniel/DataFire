'use strict';

const { PROJECT_TABLE, ProjectSchema } = require('../models/proyectos.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(
      PROJECT_TABLE,
      'ganancia',
      ProjectSchema.ganancia,
    );
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(PROJECT_TABLE, 'anticipo');
    await queryInterface.removeColumn(PROJECT_TABLE, 'presupuesto');
    await queryInterface.removeColumn(PROJECT_TABLE, 'ganancia');
  },
};
