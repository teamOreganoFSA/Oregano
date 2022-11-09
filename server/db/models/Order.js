const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  orderStatus: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = Order;
