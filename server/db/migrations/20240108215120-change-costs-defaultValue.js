'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('proyectos', 'costo', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: function () {
        return this.getDataValue('costo_inicial');
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Puedes revertir el cambio si es necesario
    await queryInterface.changeColumn('proyectos', 'costo', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0, // Puedes ajustar el valor predeterminado original aquí
    });
  },
};
