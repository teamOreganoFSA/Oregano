const router = require("express").Router();
const {
  models: { Product, User },
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

// GET /api/admin/users
router.get("/users", requireToken, async (req, res, next) => {
  try {
    if (req.admin.id) {
      const users = await User.findAll({
        where: {
          userType: "USER",
        },
        attributes: ["id", "firstName", "lastName", "email"],
      });
      res.send(users);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// POST /api/admin
router.post("/", requireToken, async (req, res, next) => {
  try {
    if (req.admin.id) {
      const product = req.body;
      const addedProduct = Product.create(product);
      res.json(addedProduct);
    }
  } catch (err) {
    next(err);
  }
});

// PUT /api/admin/:productId
router.put("/:productId", requireToken, async (req, res, next) => {
  try {
    if (req.admin.id) {
      const product = await Product.findByPk(req.params.productId);
      res.json(product.update(req.body));
    }
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/:productId
router.delete("/:productId", requireToken, async (req, res, next) => {
  try {
    if (req.admin.id) {
      const product = await Product.findByPk(req.params.productId);
      await product.destroy();
      const allProducts = await Product.findAll();
      res.send(allProducts);
    }
  } catch (error) {
    next(error);
  }
});
