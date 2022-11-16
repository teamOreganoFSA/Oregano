const router = require("express").Router();
const {
  models: { User, Order },
} = require("../db");
module.exports = router;

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

// GET /api/orders/auth
router.get("/auth", requireToken, async (req, res, next) => {
  try {
    const [order] = await Order.findAll({
      where: {
        userId: req.user.id,
        isCart: false,
      },
    });
    res.json(await order.getProducts());
  } catch (err) {
    next(err);
  }
});
