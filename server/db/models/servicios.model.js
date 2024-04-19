const { Model, DataTypes, Sequelize } = require('sequelize');

const { PROJECT_TABLE } = require('./proyectos.model');
const { Hooks } = require('sequelize/lib/hooks');

const SERVICES_TABLE = 'services';

const ServiceSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  project_id: {
    field: 'project_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PROJECT_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  service: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  cost: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  fecha_costo: {
    allowNull: true,
    type: DataTypes.DATE,
    default: '2019-01-12T08:28:24.762Z',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};

class Service extends Model {
  static associate(models) {
    this.belongsTo(models.Project, {
      foreignKey: 'project_id',
      as: 'project',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SERVICES_TABLE,
      modelName: 'Service',
      timestamps: false,
      hooks: {
        afterCreate: async (service, options) => {
          const project = await service.getProject();
          if (project) {
            project.ganancia = project.abonado - project.costo;
            await project.save();

            this.sequelize.models.ProjectService.updateCardsWebsocket(
              project.id,
            );
          }
        },
        afterDestroy: async (service, options) => {
          const project = await service.getProject();
          if (project) {
            project.ganancia = project.abonado - project.costo; // Actualizar la ganancia
            await project.save();
            this.sequelize.models.ProjectService.updateCardsWebsocket(
              project.id,
            );
          }
        },
      },
    };
  }
}
module.exports = {
  SERVICES_TABLE,
  ServiceSchema,
  Service,
};
