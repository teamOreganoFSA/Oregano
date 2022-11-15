const router = require("express").Router();
const { Sequelize } = require("sequelize");
const {
  models: { Product, Order, User, OrderProduct },
} = require("../db");
module.exports = router;

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log("token >>", token);
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

//GET /products/men
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

// GET /products/women
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

// GET /products/single/:ID
router.get("/single/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

//POST /api/products/:productId/auth
router.post("/:productId/auth", requireToken, async (req, res, next) => {
  try {
    const [order] = await Order.findOrCreate({
      where: {
        userId: req.user.id,
      },
    });
    const product = await Product.findByPk(req.params.productId);
    const result = await product.addOrder(order);
    if (!result) {
      const forQuantity = await OrderProduct.update(
        { quantity: Sequelize.literal("quantity + 1") },
        {
          where: {
            orderId: order.id,
            productId: product.id,
          },
        }
      );
      res.json(forQuantity);
    } else {
      res.json(result);
    }
  } catch (err) {
    console.log("There was an error adding to cart", err);
    next(err);
  }
});
