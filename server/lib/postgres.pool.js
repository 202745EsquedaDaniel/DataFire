const { Pool } = require('pg');


  const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'dani',
    password: 'daniadmin123',
    database: 'ultron',
  });



module.exports = pool;
