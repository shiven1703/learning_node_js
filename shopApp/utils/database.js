const Sequelize = require("sequelize");

const db = new Sequelize("shop", "root", "Letmein@123", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
