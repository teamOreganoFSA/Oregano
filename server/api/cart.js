const router = require("express").Router();
const {
  models: { Order, User },
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
router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        isCart: true,
      },
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// GET /api/cart/auth
router.get("/auth", requireToken, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.user.id,
        isCart: true,
      },
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});
