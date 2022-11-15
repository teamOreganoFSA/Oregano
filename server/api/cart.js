const router = require("express").Router();
const {
  models: { Order, User, OrderProduct, Product },
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

// GET /api/cart/auth
router.get("/auth", requireToken, async (req, res, next) => {
  try {
    const [cart] = await Order.findAll({
      where: {
        userId: req.user.id,
        isCart: true,
      },
    });
    res.json(await cart.getProducts());
  } catch (err) {
    next(err);
  }
});

// PUT /api/cart/auth
router.put("/auth", requireToken, async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
      },
    });
    const product = await Product.findByPk(req.body.productId);
    console.log("product information", product);
    const changeQuantity = await OrderProduct.update(
      {
        quantity: req.body.quantity,
      },
      {
        where: { orderId: order.id, productId: product.id },
        returning: true,
        plain: true,
      }
    );
    console.log("api cart", changeQuantity);
    res.json(changeQuantity);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// DELETE /api/cart/auth
router.delete("/auth", requireToken, async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.body.productId,
      },
    });
    const chosenProduct = await OrderProduct.findOne({
      where: {
        productId: product.id,
      },
    });
    await chosenProduct.destroy();
    res.json(chosenProduct);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/cart/auth/all
router.delete("/auth/all", requireToken, async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
      },
    });
    const chosenCart = await OrderProduct.destroy({
      where: {
        orderId: order.id,
      },
    });
    res.json(chosenCart);
  } catch (err) {
    next(err);
  }
});
