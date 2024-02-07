const { faker } = require('@faker-js/faker');
const { models } = require('../lib/sequelize');
const { Abonos } = require('../db/models/abonos.model');
const boom = require('@hapi/boom');
const {
  addCustomerRESchema,
  addWorkerRESchema,
  addServiceSchema,
} = require('../schemas/proyectos.schema');
const { ProjectSchema } = require('../db/models/proyectos.model');

class ProjectService {
  constructor() {
    // this.projects = [], this.generate()
  }
  // -------Project Services! -----
  async find() {
    const rta = await models.Project.findAll();
    return rta;
  }

  async findOne(id) {
    const project = await models.Project.findByPk(id, {
      include: [
        {
          model: models.ProjectCustomer,
          as: 'projectCustomers',
        },
        {
          model: models.ProjectWorker,
          as: 'projectWorkers',
        },
        'abonos',
        'services',
      ],
    });

    if (!project) {
      throw boom.notFound('Project not found');
    }

    return project;
  }

  async update(id, changes) {
    const project = await this.findOne(id);

    const rta = await project.update(changes);
    return rta;
  }

  async deleteProject(id) {
    const project = await this.findOne(id);

    await project.destroy();
    return { id };
  }

  async create(data) {
    try {
      // Obtener el valor predeterminado de costo_inicial del esquema
      const defaultInitialCost = ProjectSchema.costo_inicial.defaultValue;

      // Establecer el valor predeterminado de costo_inicial como costo al crear el proyecto
      const newProjectData = {
        ...data,
        costo: data.costo || defaultInitialCost,
      };

      const newProject = await models.Project.create(newProjectData);
      return newProject;
    } catch (error) {
      console.error('Error al crear un proyecto:', error);
      throw error;
    }
  }
  // ---------ProjectCustomers Service!-------
  async findCustomersProjects() {
    const rta = await models.ProjectCustomer.findAll();
    return rta;
  }

  async findOneProjectCustomer(id) {
    const projectCustomer = await models.ProjectCustomer.findByPk(id, {});

    if (!projectCustomer) {
      throw boom.notFound('ProjectCustomer not found');
    }

    return projectCustomer;
  }

  async addCustomer(data) {
    try {
      // Validar datos con Joi
      await addCustomerRESchema.validateAsync(data);

      // Obtener instancias de Project y Customer (puedes realizar consultas a la base de datos)
      const project = await models.Project.findByPk(data.project_id);
      const customer = await models.Customer.findByPk(data.customer_id);

      // Crear una nueva instancia de ProjectCustomer con las asociaciones
      const newCustomer = await models.ProjectCustomer.create({
        project_id: project.id,
        customer_id: customer.id,
        project_name: project.name,
        customer_name: `${customer.name} ${customer.last_name}`,
      });

      return newCustomer;
    } catch (error) {
      console.error('Error al agregar un cliente:', error);
      throw error;
    }
  }
  async deleteProjectCustomer(id) {
    const project = await this.findOneProjectCustomer(id);

    await project.destroy();
    return { id };
  }

  //----------ProjectWorkers Services!-----
  async findProjectsWorkers() {
    const rta = await models.ProjectWorker.findAll();
    return rta;
  }

  async findOneProjectWorker(id) {
    const projectWorker = await models.ProjectWorker.findByPk(id, {});

    if (!projectWorker) {
      throw boom.notFound('ProjectWorker not found');
    }
    return projectWorker;
  }

  async addProjectWorker(data) {
    try {
      await addWorkerRESchema.validateAsync(data);

      // Obtener instancias de Project y Worker
      const project = await models.Project.findByPk(data.project_id);
      const worker = await models.Worker.findByPk(data.worker_id);

      // Crear una nueva instancia de ProjectCustomer con las asociaciones
      const newWorker = await models.ProjectWorker.create({
        project_id: project.id,
        worker_id: worker.id,
        project_name: project.name,
        worker_name: `${worker.name} ${worker.last_name}`,
      });

      return newWorker;
    } catch (error) {
      console.error('Error al agregar un Trabajador:', error);
      throw error;
    }
  }
  async deleteProjectWorker(id) {
    const projectWorker = await this.findOneProjectWorker(id);
    await projectWorker.destroy();
    return { id };
  }

  //----------Costos Services!-----
  async findServices() {
    const rta = await models.Service.findAll();
    return rta;
  }

  async findOneService(id) {
    const service = await models.Service.findByPk(id, {});

    if (!service) {
      throw boom.notFound('Service not found');
    }
    return service;
  }

  async updateCost(id, changes) {
    const cost = await this.findOneService(id);

    const rta = await cost.update(changes);
    return rta;
  }

  // En tu lógica de negocio para crear un servicio
  async createService(data) {
    const newService = await models.Service.create(data);

    // Llamada a la función que actualiza el costo total del proyecto al insertar un servicio
    await models.Service.sequelize.query(
      'SELECT actualizar_costo_proyecto_al_insertar_servicio(:cost, :project_id)',
      {
        replacements: {
          cost: newService.cost,
          project_id: newService.project_id,
        },
        type: models.Service.sequelize.QueryTypes.SELECT,
      },
    );

    return newService;
  }
  async deleteService(id) {
    const service = await this.findOneService(id);
    const projectId = service.project_id;

    const costoServicio = service.cost;

    await service.destroy();

    // Llamada a la función que actualiza el costo total del proyecto al eliminar un servicio
    await models.Service.sequelize.query(
      'SELECT actualizar_costo_proyecto_al_eliminar_servicio(:cost, :project_id)',
      {
        replacements: { cost: costoServicio, project_id: projectId },
        type: models.Service.sequelize.QueryTypes.SELECT,
      },
    );

    return { id };
  }

  async updateProjectTotalCost(projectId) {
    const project = await models.Project.findByPk(projectId);

    if (project) {
      // Calcula la suma total de los costos de los servicios asociados al proyecto
      const totalCostOfServices = await models.Service.sum('cost', {
        where: { project_id: projectId },
      });

      // Si es el primer servicio, agrega el costo inicial del proyecto
      const totalCost = totalCostOfServices + project.costo;

      // Actualiza el costo total del proyecto
      await project.update({ costo: totalCost || 0 });
    }
  }

  /**--------------Abonos--------------------- */
  async findAbonos() {
    const rta = await models.Abonos.findAll();
    return rta;
  }

  async findOneAbono(id) {
    const abono = await models.Abonos.findByPk(id, {});

    if (!abono) {
      throw boom.notFound('Abono not found');
    }
    return abono;
  }

  async updateAbono(id, changes) {
    const abono = await this.findOneAbono(id);
    const rta = await abono.update(changes);

    // Lógica para actualizar el monto abonado en el proyecto correspondiente
    const nuevoMontoAbono = changes.monto || 0;
    const proyectoId = abono.projectId;

    try {
      // Acceder a la instancia de Sequelize a través del modelo Abonos
      await Abonos.sequelize.query(
        'CALL actualizar_monto_abonado(:nuevo_monto, :proyecto_id)',
        {
          replacements: {
            nuevo_monto: nuevoMontoAbono,
            proyecto_id: proyectoId,
          },
          type: Abonos.sequelize.QueryTypes.RAW,
        },
      );

      console.log('Monto abonado actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar el monto abonado:', error);
    }

    return rta;
  }

  async createAbono(data) {
    const newAbono = await Abonos.create(data);

    // Lógica para actualizar el monto abonado en el proyecto correspondiente
    const nuevoMontoAbono = data.monto || 0; // Ajusta según tu estructura de datos
    const proyectoId = data.projectId; // Ajusta según tu estructura de datos

    try {
      // Cambia la llamada de CALL a SELECT para invocar la función almacenada
      await Abonos.sequelize.query(
        'SELECT actualizar_monto_abonado(:nuevo_monto, :proyecto_id)',
        {
          replacements: {
            nuevo_monto: nuevoMontoAbono,
            proyecto_id: proyectoId,
          },
          type: Abonos.sequelize.QueryTypes.SELECT,
        },
      );

      console.log('Monto abonado actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar el monto abonado:', error);
    }

    return newAbono;
  }

  async deleteAbono(id) {
    const abono = await this.findOneAbono(id);
    await abono.destroy();

    // Lógica para actualizar el monto abonado en el proyecto correspondiente
    const nuevoMontoAbono = data.monto; // Se asume que se restablece a cero al eliminar el abono
    const proyectoId = abono.projectId;

    try {
      // Acceder a la instancia de Sequelize a través del modelo Abonos
      await Abonos.sequelize.query(
        'SELECT restar_monto_abonado(:monto_a_restar, :proyecto_id)',
        {
          replacements: {
            monto_a_restar: nuevoMontoAbono,
            proyecto_id: proyectoId,
          },
          type: Abonos.sequelize.QueryTypes.SELECT,
        },
      );

      console.log('Monto abonado actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar el monto abonado:', error);
    }

    return { id };
  }

  // project Stats route
}

module.exports = ProjectService;
