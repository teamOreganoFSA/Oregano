const router = require("express").Router();
const { Sequelize } = require("sequelize");
const {
  models: { Product, Order, User, OrderProduct },
} = require("../db");
module.exports = router;

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
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
    console.log("Printing products: ", products);
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /PRODUCTS/single/:ID
//needed to do because category is also a params
router.get("/single/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

//GET /PRODUCTS/MEN
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

// GET /PRODUCTS/WOMEN
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

// POST /product/auth
router.post("/auth", requireToken, async (req, res, next) => {
  try {
    const prod = req.body;
    const added = Product.create(prod);
    res.json(added);
  } catch (err) {
    next(err);
  }
});

router.put("/auth/:productId/", requireToken, async (req, res, next) => {
  try {
    const oldProd = await Product.findByPk(req.params.productId);
    res.json(oldProd.update(req.body));
  } catch (err) {
    next(err);
  }
});

router.delete("/auth/:productId/", requireToken, async (req, res, next) => {
  try {
    const prod = await Product.findByPk(req.params.productId);
    await prod.destroy();
    res.send(prod);
  } catch (err) {
    next(err);
  }
});

//POST /api/products/:productId
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
