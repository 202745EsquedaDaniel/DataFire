const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const {
  logErrors,
  errorHandler,
  boomHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');
const fs = require('fs');
const pgp = require('pg-promise')();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
console.clear();

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
};
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Hello server');
});

// Ejecutar script SQL durante la inicialización
async function runInitializationScript() {
  try {
    const sqlScript = fs.readFileSync(
      './db/stored_Procedures/update_costo.sql',
      'utf8',
    );
    const connection = pgp(
      'postgresql://postgres:Be4bagCBF*fADAFFA3CB-fAA2b4d14G6@monorail.proxy.rlwy.net:15876/railway',
    );
    await connection.none(sqlScript);
    pgp.end();
    console.log('Stored procedure creado exitosamente.');
  } catch (error) {
    console.error('Error al ejecutar el script SQL:', error);
  }
}

try {
  runInitializationScript();
} catch (error) {
  console.error('Error en la inicialización:', error);
}

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('My port:' + port);
});
