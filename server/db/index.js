//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Order = require("./models/Order");
const Product = require("./models/Product");
const OrderProducts = require("./models/OrderProducts");

User.hasMany(Order);
Order.belongsTo(User, {
  foreignKey: "userId",
});

Order.belongsToMany(Product, { through: OrderProducts });
Product.belongsToMany(Order, { through: OrderProducts });

module.exports = {
  db,
  models: {
    User,
    Order,
    Product,
    OrderProducts,
  },
};
