const router = require("express").Router();
const {
  models: { Order, User, OrderProduct },
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

// GET /api/cart
// THIS IS A ROUTE FOR THE GUEST CART WHICH INVOLVES THE LOCALSTORAGE. IDK IF THIS CAN APPLY TO IT BUT ITS HERE JUST IN CASE - ERIK
router.get("/", async (req, res, next) => {
  try {
    const [cart] = await Order.findAll({
      where: {
        isCart: true,
      },
    });
    const itemsInCart = await OrderProduct.findAll({
      where: {
        orderId: cart.id,
      },
    });
    res.json(itemsInCart);
  } catch (err) {
    next(err);
  }
});

// GET /api/cart/auth
router.get("/auth", requireToken, async (req, res, next) => {
  try {
    const [cart] = await Order.findAll({
      where: {
        userId: req.user.id,
        isCart: true,
      },
    });
    const itemsInCart = await OrderProduct.findAll({
      where: {
        orderId: cart.id,
      },
    });
    res.json(itemsInCart);
  } catch (err) {
    next(err);
  }
});
