'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if the trigger already exists before creating it
    const triggerExists = await queryInterface.sequelize.query(
      `
      SELECT tgname FROM pg_trigger WHERE tgname = 'trigger_actualizar_costo_proyecto_al_insertar_servicio';
      `,
      { type: Sequelize.QueryTypes.SELECT },
    );

    if (!triggerExists || !triggerExists.length) {
      // Add a function to update 'costo' in the 'proyectos' table when inserting a new service
      await queryInterface.sequelize.query(`
        CREATE OR REPLACE FUNCTION actualizar_costo_proyecto_al_insertar_servicio(nuevo_costo INT, proyecto_id INT) RETURNS VOID AS $$
        BEGIN
          UPDATE proyectos
          SET costo = costo + nuevo_costo
          WHERE id = proyecto_id;
        END;
        $$ LANGUAGE plpgsql;
      `);

      // Add a trigger to invoke the function when inserting a service
      await queryInterface.sequelize.query(`
        CREATE TRIGGER trigger_actualizar_costo_proyecto_al_insertar_servicio
        AFTER INSERT ON services
        FOR EACH ROW
        EXECUTE FUNCTION actualizar_costo_proyecto_al_insertar_servicio(NEW.cost, NEW.project_id);
      `);
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the trigger and function if they exist
    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS trigger_actualizar_costo_proyecto_al_insertar_servicio ON services;
    `);

    await queryInterface.sequelize.query(`
      DROP FUNCTION IF EXISTS actualizar_costo_proyecto_al_insertar_servicio(INT, INT);
    `);
  },
};
