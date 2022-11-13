const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// Add User // POST /api/users/
// Use for admin adding users (may not need)
// Expects req.body = {user fields}
// Good place to add admin users
router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send({token: await user.generateToken()})
  } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
   }
})

// Edit user // PUT /api/users/:userId
router.put('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    if(user) {
      await user.update(req.body);
      res.send(user);
    }
  } catch (err) { next(err) }
})

// Delete user account
router.delete('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await User.destroy({ where: {
      id: userId
    }})
  } catch (err) { next(err) }
})
