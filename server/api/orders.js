const router = require("express").Router();
const {
  models: { Order },
} = require("../db");
module.exports = router;

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

// GET /api/orders/:userId
router.get("/:userId", async (req, res, next) => {
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
