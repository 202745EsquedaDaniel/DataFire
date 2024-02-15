const proyectosRouter = require('./proyectos.router');
const clientesRouter = require('./clientes.router');
const trabajadoresRouter = require('./trabajadores.router');
const usersRouter = require('./users.router');
const authRouter = require('./auth.router');
const payrollsRouter = require('./payrolls.router');

function routerApi(app) {
  app.use('/Api/v1/proyectos', proyectosRouter),
    app.use('/Api/v1/clientes', clientesRouter),
    app.use('/Api/v1/trabajadores', trabajadoresRouter),
    app.use('/Api/v1/users', usersRouter),
    app.use('/Api/v1/auth', authRouter),
    app.use('/Api/v1/payrolls', payrollsRouter);
}

module.exports = routerApi;
