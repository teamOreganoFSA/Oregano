const router = require("express").Router();
const {
  models: { Product, Order, OrderProduct },
} = require("../db");
module.exports = router;

//GET /api/products
router.get("/", async (req, res, next) => {
  try {
    console.log("hello world");
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});
//GET /api/products/men
router.get("/men", async (req, res, next) => {
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

//GET /api/products/men
router.get("/women", async (req, res, next) => {
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

//GET /api/products/:productId
router.get("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

//POST /api/products/:productId
router.post("/:productId", async (req, res, next) => {
  try {
    const order = await Order.create();
    const product = await Product.findByPk(req.params.productId);
    const result = await product.addOrder(order);
    res.json(result);
  } catch (err) {
    console.log("There was an error adding to cart", err);
    next(err);
  }
});
