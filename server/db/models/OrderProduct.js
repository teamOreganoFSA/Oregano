const Sequelize = require("sequelize");
const db = require("../db");

const OrderProducts = db.define("orderProducts", {
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = OrderProducts;
