'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Elimina todas las funciones relacionadas con la actualización del costo en proyectos al insertar o eliminar un servicio
    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS trigger_actualizar_costo_proyecto_al_insertar_servicio ON services;
    `);

    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS trigger_actualizar_costo_proyecto_al_eliminar_servicio ON services;
    `);

    await queryInterface.sequelize.query(`
      DROP FUNCTION IF EXISTS actualizar_costo_proyecto_al_insertar_servicio(INT, INT);
    `);

    await queryInterface.sequelize.query(`
      DROP FUNCTION IF EXISTS actualizar_costo_proyecto_al_eliminar_servicio(INT, INT);
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // No es necesario implementar nada en el método down
  },
};
