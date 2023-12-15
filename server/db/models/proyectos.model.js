const {Model, DataTypes, Sequelize} = require("sequelize")

const PROJECT_TABLE = "proyectos"

const ProjectSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name:{
    allowNull: false,
    type: DataTypes.STRING
  },
  fecha_inicio: {
    allowNull: false,
    type: DataTypes.DATE
  },
  fecha_fin: {
    allowNull: false,
    type: DataTypes.DATE
  },
  costo:{
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW
  }
}

class Project extends Model {
  static associate(models){
    this.belongsToMany(models.Cusomer, {
      as: "customers", //osea que un proyecto tiene varios clientes
      through: models.ProjectCustomer,
      foreignKey: "projectID",
      otherKey: "customerId"
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROJECT_TABLE,
      modelname: "project",
      timestamps: false
    }
  }
}

module.exports = {PROJECT_TABLE, ProjectSchema, Project}
