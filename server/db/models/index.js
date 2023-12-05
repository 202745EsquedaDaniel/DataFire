const {Customer, CustomerSchema} = require("./cliente.model")
const {Project, ProjectSchema} = require("./proyectos.model")

function setupModels(sequelize){
  Customer.init(CustomerSchema, Customer.config(sequelize)),
  Project.init(ProjectSchema, Project.config(sequelize))
}

module.exports = setupModels
