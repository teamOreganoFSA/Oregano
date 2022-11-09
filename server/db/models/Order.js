const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  isCart: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

module.exports = Order;
