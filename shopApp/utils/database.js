const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "shop",
  password: "Letmein@123",
});

module.exports = pool.promise();
