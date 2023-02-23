require("dotenv").config();

const { Pool } = require("pg");

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;


const pool = new Pool({
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  host: DB_HOST,
  porta: DB_PORT,
});
pool.connect( (err)=> {
  if (err) {
    console.log(err);
    throw err;
  } else {
    console.log("Conectado banco teste");
  }
});

module.exports = pool;

