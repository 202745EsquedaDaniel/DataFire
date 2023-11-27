const express = require('express');
const app = express();
const port = 3001;
const routerApi = require('./routes');

console.clear();

app.get('/', (req, res) => {
  res.send('Hello server');
});

app.listen(port, () => {
  console.log('My port:' + port);
});

app.get('/clientes', (req, res) => {
  res.send('clientes');
});

app.get('/trabajadores', (req, res) => {
  res.send('trabajadores');
});

routerApi(app);
