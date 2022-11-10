const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  date: {
    type: Sequelize.DATEONLY,
    defaultValue: Sequelize.NOW,
  },
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Order;
