const { Model, DataTypes, Sequelize } = require('sequelize');

const { CUSTOMER_TABLE } = require('./cliente.model');

const { Op } = require('sequelize');

const PROJECT_TABLE = 'proyectos';

const ProjectSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  fecha_inicio: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  fecha_fin: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  costo_inicial: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  costo: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  abonado: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  remaining: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
    defaultValue: 1,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};

class Project extends Model {
  static associate(models) {
    this.hasMany(models.ProjectCustomer, {
      as: 'projectCustomers',
      foreignKey: 'project_id',
    });
    this.hasMany(models.Abonos, {
      as: 'abonos',
      foreignKey: 'projectId',
    });
    this.hasMany(models.ProjectWorker, {
      as: 'projectWorkers',
      foreignKey: 'project_id',
    });
    this.hasMany(models.Service, {
      as: 'services',
      foreignKey: 'project_id',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROJECT_TABLE,
      modelname: 'project',
      timestamps: false,
    };
  }

  static async getTotalProjects() {
    try {
      const totalProjects = await this.count();
      return totalProjects;
    } catch (error) {
      console.error('Error fetching total projects:', error);
      throw error;
    }
  }

  static async getProjectsByMonth() {
    try {
      const currentDate = new Date();
      const twelveMonthsAgo = new Date(currentDate);
      twelveMonthsAgo.setMonth(currentDate.getMonth() - 12);

      const projectsByMonth = await this.findAll({
        attributes: [
          [
            Sequelize.fn('date_trunc', 'month', Sequelize.col('fecha_inicio')),
            'month',
          ],
          [Sequelize.fn('count', Sequelize.col('*')), 'projectCount'],
        ],
        where: {
          fecha_inicio: {
            [Op.between]: [twelveMonthsAgo, currentDate],
          },
        },
        group: [
          Sequelize.fn('date_trunc', 'month', Sequelize.col('fecha_inicio')),
        ],
        order: [
          Sequelize.fn('date_trunc', 'month', Sequelize.col('fecha_inicio')),
        ],
      });

      return projectsByMonth;
    } catch (error) {
      console.error('Error fetching projects by month:', error);
      throw error;
    }
  }

  static async getExpensesByMonth() {
    try {
      const currentDate = new Date();
      const twelveMonthsAgo = new Date(currentDate);
      twelveMonthsAgo.setMonth(currentDate.getMonth() - 12);

      const expensesByMonth = await this.findAll({
        attributes: [
          [
            Sequelize.fn('date_trunc', 'month', Sequelize.col('fecha_inicio')),
            'month',
          ],
          [Sequelize.fn('sum', Sequelize.col('costo')), 'totalExpense'],
        ],
        where: {
          fecha_inicio: {
            [Op.between]: [twelveMonthsAgo, currentDate],
          },
        },
        group: [
          Sequelize.fn('date_trunc', 'month', Sequelize.col('fecha_inicio')),
        ],
        order: [
          Sequelize.fn('date_trunc', 'month', Sequelize.col('fecha_inicio')),
        ],
      });

      return expensesByMonth;
    } catch (error) {
      console.error('Error fetching expenses by month:', error);
      throw error;
    }
  }
}

module.exports = { PROJECT_TABLE, ProjectSchema, Project };
