'use strict';

const { PROJECT_TABLE, ProjectSchema } = require('../models/proyectos.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(
      PROJECT_TABLE,
      'costo_inicial',
      ProjectSchema.costo_inicial,
    );
    await queryInterface.addColumn(
      PROJECT_TABLE,
      'abonado',
      ProjectSchema.abonado,
    );
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(PROJECT_TABLE, 'costo_inicial');
    await queryInterface.removeColumn(PROJECT_TABLE, 'abonado');
  },
};
