const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: false,
  },
  inventoryQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  imageURL: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue:
      "https://nonprofitquarterly.org/wp-content/uploads/2020/02/comic_image_missing.jpg",
  },
});

module.exports = Product;
