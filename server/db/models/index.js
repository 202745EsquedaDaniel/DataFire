const {Customer, CustomerSchema} = require("./cliente.model")

function setupModels(sequelize){
  Customer.init(CustomerSchema, Customer.config(sequelize))
}

module.exports = setupModels
