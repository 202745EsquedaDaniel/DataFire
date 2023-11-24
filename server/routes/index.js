const proyectosRouter = require("./proyectos.router")
const clientesRouter = require("./clientes.router")
const trabajadoresRouter = require("./trabajadores.router")

function routerApi(app) {
  app.use("/Api/v1/proyectos", proyectosRouter),
  app.use("/Api/v1/clientes", clientesRouter),
  app.use("/Api/v1/trabajadores",trabajadoresRouter)
}

module.exports = routerApi;
