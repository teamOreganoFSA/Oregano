const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
module.exports = router;

router.get("/products", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    console.log('Printing products: ', products);
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get("/products/men", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        category: "MEN",
      },
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get("/products/women", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        category: "WOMEN",
      },
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get("/products/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    res.json(product);
  } catch (err) {
    next(err);
  }
});
