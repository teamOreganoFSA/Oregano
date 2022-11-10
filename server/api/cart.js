const router = require("express").Router();
const {
  models: { Order },
} = require("../db");
module.exports = router;

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

// GET /api/cart/:userId
router.get("/:userId", async (req, res, next) => {
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
