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

// POST /api/checkout/
router.post("/"),
  requireToken,
  async (req, res, next) => {
    try {
    } catch (err) {
      next(err);
    }
  };
