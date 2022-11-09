const router = require("express").Router();
const {
  models: { Order },
} = require("../db");
module.exports = router;

router.get("/:userId/cart", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.userId,
        isCart: true,
      },
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId/orders", async (req, res, next) => {
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
