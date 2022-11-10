const router = require("express").Router();
const {
  models: { Product, Order, OrderProduct },
} = require("../db");
module.exports = router;


router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    console.log('Printing products: ', products);
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /PRODUCTS/single/:ID
//needed to do because category is also a params
router.get("/single/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

//GET /PRODUCTS/MEN
router.get("/men", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        category: "MEN",
      },
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /PRODUCTS/WOMEN
router.get("/women", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        category: "WOMEN",
      },
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});


//GET /api/products/:productId
router.get("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// POST /product/add
router.post("/add", async (req, res, next) => {
  try {
    const addProduct = req.body;
    Product.create(addProduct);
    res.json(addProduct);
  } catch (err) { next(err) }
})

router.put("/:productId/edit", async (req, res, next) => {
  try {
    const oldProd = await Product.findByPk(req.params.productId);
    res.json(oldProd.update(req.body));
  } catch (err) { next(err) }
})

router.delete("/:productId/remove", async (req, res, next) => {
  try {
    const prod = await Product.findByPk(req.params.productId);
    await prod.destroy();
    res.send(prod);
  } catch (err) { next(err) }
})

//POST /api/products/:productId
router.post("/:productId", async (req, res, next) => {
  try {
    const order = await Order.create();
    const product = await Product.findByPk(req.params.productId);
    const result = await product.addOrder(order);
    res.json(result);
  } catch (err) {
    console.log("There was an error adding to cart", err);
    next(err);
  }
});

