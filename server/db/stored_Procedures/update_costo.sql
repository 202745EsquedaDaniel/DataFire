'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('services', {
    });

    // Crear procedimiento almacenado para actualizar el costo total del proyecto
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION actualizar_costo_total_proyecto(project_id INT)
      RETURNS VOID AS $$
      DECLARE
        total_cost INT;
      BEGIN
        SELECT COALESCE(SUM(cost), 0) INTO total_cost
        FROM services
        WHERE project_id = $1;

        UPDATE projects
        SET costo = total_cost
        WHERE id = $1;
      END;
      $$ LANGUAGE plpgsql;
    `);
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable('services');
    await queryInterface.sequelize.query('DROP FUNCTION IF EXISTS actualizar_costo_total_proyecto(INT);');
  }
};
