const router = require("express").Router();
const {
  models: { Order },
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

// GET /api/orders
router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        isCart: false,
      },
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// GET /api/orders/auth
router.get("/auth", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.userId,
        isCart: false,
      },
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});
