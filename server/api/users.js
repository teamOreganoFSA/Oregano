const router = require("express").Router();
const {
  models: { User },
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

//GET /api/users/id
router.get("/:userId", requireToken, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// Edit user // PUT /api/users/:userId
router.put("/:userId", requireToken, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    await user.update(req.body);
    res.send(user);
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

// Add User // POST /api/users/
// Use for admin adding users (may not need)
// Expects req.body = {user fields}
// Good place to add admin users
// router.post('/:userId', requireToken, async (req, res, next) => {
//   try {
//     const user = await User.create(req.body);
//     res.send({token: await user.generateToken()})
//   } catch (err) {
//       if (err.name === 'SequelizeUniqueConstraintError') {
//         res.status(401).send('User already exists')
//       } else {
//         next(err)
//       }
//    }
// })


