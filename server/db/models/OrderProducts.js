const Sequelize = require("sequelize");
const db = require("../db");
const Order = require("./Order");
const Product = require("./Product");

const OrderProducts = db.define("orderProducts", {
  OrderId: {
    type: Sequelize.INTEGER,
    references: {
      model: Order,
      key: "id",
    },
  },
  ProductId: {
    type: Sequelize.INTEGER,
    references: {
      model: Product,
      key: "id",
    },
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = OrderProducts;
