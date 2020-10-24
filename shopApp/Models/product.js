const Sequelize = require("sequelize");

const db = require("./../utils/database");

const Product = db.define("product", {
  productId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  productName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  productDescription: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  price: {
    type: Sequelize.DOUBLE(10, 2),
    allowNull: false,
  },
  img_url: Sequelize.STRING,
});

module.exports = Product;
