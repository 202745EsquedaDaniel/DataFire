'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION actualizar_monto_abonado(nuevo_monto INT, proyecto_id INT) RETURNS VOID AS $$
      BEGIN
        UPDATE proyectos
        SET abonado = abonado + nuevo_monto
        WHERE id = proyecto_id;
      END;
      $$ LANGUAGE plpgsql;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      DROP FUNCTION IF EXISTS actualizar_monto_abonado(INT, INT);
    `);
  },
};
