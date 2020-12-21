const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "Winter@1",
  host: "localhost",
  port: 5432,
  database: "chat"   
});

module.exports = pool;