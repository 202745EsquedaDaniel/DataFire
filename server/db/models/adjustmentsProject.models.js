const { Model, DataTypes, Sequelize } = require('sequelize');
const { PROJECT_TABLE } = require('./proyectos.model');
const { CUSTOMER_TABLE } = require('./cliente.model');

const ADJUSTMENTS_TABLE = 'Adjustments';

const AdjustmentSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  monto: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  fecha_ajuste: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  projectId: {
    field: 'proyecto_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PROJECT_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
    defaultValue: 0,
  },
  motive: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  operation: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    default: false,
    //true sera suma al presupuesto
    //false sera resta al presupuesto
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};

class Adjustments extends Model {
  static associate(models) {
    this.belongsTo(models.Project, {
      as: 'project',
      foreignKey: 'projectId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ADJUSTMENTS_TABLE,
      modelName: 'Adjustments',
      timestamps: false,
      hooks: {
        afterCreate: async (abono, options) => {
          setTimeout(async () => {
            console.log(abono.monto);
            const proyecto = await abono.getProject();
            if (proyecto.remaining === 0) {
              proyecto.status = true;
              await proyecto.save(); // Guarda los cambios en la base de datos
            } else {
              proyecto.status = false;
              await proyecto.save();
            }
          }, 2000); // 2000 milisegundos = 2 segundos
        },
      },
    };
  }
}

module.exports = {
  ADJUSTMENTS_TABLE,
  AdjustmentSchema,
  Adjustments,
};
