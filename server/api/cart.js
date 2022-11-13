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
    const changeQuantity = await OrderProduct.update(
      {
        quantity: req.body.quantity,
      },
      {
        where: { orderId: order.id, productId: product.id },
      }
    );
    res.json(changeQuantity);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/cart/auth
router.delete("/auth", requireToken, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.body.productId);
    await product.destroy();
    res.json(product);
  } catch (err) {
    next(err);
  }
});
