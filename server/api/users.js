const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    if (user.userType === "ADMIN") {
      req.admin = user;
      next();
    }
  } catch (error) {
    next(error);
  }
};

// Add User // POST /api/users/
// Use for admin adding users (may not need)
// Expects req.body = {user fields}
// Good place to add admin users
router.post("/", requireToken, async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

// Edit user // PUT /api/users/:userId
router.put("/:userId", requireToken, async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    if (user) {
      await user.update(req.body);
      res.send(user);
    }
  } catch (err) {
    next(err);
  }
});

// Delete user account
router.delete("/:userId", requireToken, async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await User.destroy({
      where: {
        id: userId,
      },
    });
  } catch (err) {
    next(err);
  }
});
