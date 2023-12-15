const {Customer, CustomerSchema} = require("./cliente.model")
const {Project, ProjectSchema} = require("./proyectos.model")
const {Worker, WorkerSchema} = require("./trabajadores.model")
const {ProjectCustomer, ProjectCustomerSchema} = require("./proyecto-cliente.model")

function setupModels(sequelize){
  Customer.init(CustomerSchema, Customer.config(sequelize)),
  Project.init(ProjectSchema, Project.config(sequelize)),
  Worker.init(WorkerSchema, Worker.config(sequelize)),
  ProjectCustomer.init(ProjectCustomerSchema, ProjectCustomer.config(sequelize))

  Project.associate(sequelize.models)
}

module.exports = setupModels
