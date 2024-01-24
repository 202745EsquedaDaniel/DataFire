const proyectosRouter = require('./proyectos.router');
const clientesRouter = require('./clientes.router');
const trabajadoresRouter = require('./trabajadores.router');
const usersRouter = require('./users.router');

function routerApi(app) {
  app.use('/Api/v1/proyectos', proyectosRouter),
    app.use('/Api/v1/clientes', clientesRouter),
    app.use('/Api/v1/trabajadores', trabajadoresRouter),
    app.use('/Api/v1/users', usersRouter);
}

module.exports = routerApi;
