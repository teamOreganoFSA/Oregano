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
  } catch (error) {
    next(error);
  }
};

// PUT /api/checkout
router.put("/", requireToken, async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        isCart: true,
      },
    });
    const checkout = await Order.update(
      { isCart: false },
      {
        where: {
          id: order.id,
        },
      }
    );
    res.json(checkout);
  } catch (err) {
    next(err);
  }
});
