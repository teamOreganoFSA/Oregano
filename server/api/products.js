const router = require("express").Router();
const {models: { Product }} = require("../db");
module.exports = router;

// /PRODUCT
router.get("/", async (req, res, next) => {
  try {
    console.log("hello world");
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});
//GET /PRODUCT/MEN
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

// GET /PRODUCT/WOMEN
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

// GET /PRODUCT/:ID
router.get("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    res.json(product);
  } catch (err) {
    next(err);
  }
});
