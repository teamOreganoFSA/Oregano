const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/auth", require("../auth"));
<<<<<<< HEAD
<<<<<<< HEAD
router.use("/orders", require("./orders"));
=======
>>>>>>> eb331fdfa44aa6bad7ac3cf5331f6a8674417f8b
=======

router.use("/orders", require("./orders"));

>>>>>>> d9570d40bf5aad95a899a3c32acd665c34e10e0d
router.use("/products", require("./products"));
router.use("/cart", require("./cart"));
router.use("/orders", require("./orders"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
