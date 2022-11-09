const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
});

router.post("/signup", async (req, res, next) => {});
