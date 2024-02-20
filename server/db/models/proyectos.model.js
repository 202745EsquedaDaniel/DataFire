const { Model, DataTypes, Sequelize } = require('sequelize');

const { startOfWeek, endOfWeek, eachWeekOfInterval } = require('date-fns');

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
  duracion: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 0,
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
      hooks: {
        beforeCreate: async (project, options) => {
          project.costo = project.costo_inicial;
        },
        beforeCreate: async (project, options) => {
          project.costo = project.costo_inicial;

          const start = new Date(project.fecha_inicio);
          const end = new Date(project.fecha_fin);

          const durationInWeeks = Math.ceil(
            (end - start) / (7 * 24 * 60 * 60 * 1000),
          );
          project.duracion = durationInWeeks;
        },
        beforeUpdate: async (project, options) => {
          const start = new Date(project.fecha_inicio);
          const end = new Date(project.fecha_fin);

          // Calculate weeks difference and set the value to "duracion"
          const durationInWeeks = Math.ceil(
            (end - start) / (7 * 24 * 60 * 60 * 1000),
          );
          project.duracion = durationInWeeks;
        },
      },
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

  static async getWeeklyExpenses() {
    try {
      const currentDate = new Date(2023, 0, 1);
      const endYearDate = new Date(2023, 11, 31);

      const weeklyExpenses = await this.sequelize.query(
        `
      SELECT
        week_start,
        name as project_name,
        name as service_name, -- Utilizar 'name' en lugar de 'service_name'
        COALESCE(SUM(costo), 0) as totalExpense
      FROM
        generate_series(
          $1::timestamp,
          $2::timestamp,
          '1 week'::interval
        ) week_start
      LEFT JOIN
        ${PROJECT_TABLE}
      ON
        fecha_inicio >= week_start
      AND
        fecha_inicio < week_start + '1 week'::interval
      LEFT JOIN
        services
      ON
        fecha_inicio >= week_start
      AND
        fecha_inicio < week_start + '1 week'::interval
      GROUP BY
        week_start, name
      ORDER BY
        week_start
    `,
        {
          bind: [currentDate, endYearDate],
          type: Sequelize.QueryTypes.SELECT,
        },
      );

      const formattedWeeklyExpenses = weeklyExpenses.map((expense) => ({
        week_start: expense.week_start,
        project: expense.project_name,
        service: expense.service_name, // Utilizar 'service_name' si la columna realmente se llama así
        totalExpense: expense.totalExpense,
      }));

      return formattedWeeklyExpenses;
    } catch (error) {
      console.error('Error fetching weekly expenses:', error);
      throw error;
    }
  }
}

module.exports = { PROJECT_TABLE, ProjectSchema, Project };
