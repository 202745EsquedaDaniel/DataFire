const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { checkApiKey } = require('./middlewares/auth.handler');

const {
  logErrors,
  errorHandler,
  boomHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

console.clear();

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};
app.use(cors(options));

require('./utils/auth/index');

app.get('/', (req, res) => {
  res.send('Hello server');
});

app.get('/new-route', checkApiKey, (req, res) => {
  res.send('Hello from the new route');
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('My port:' + port);
});
