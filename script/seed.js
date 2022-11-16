const { green, red } = require("chalk");
const {
  db,
  models: { User, Product, Order, OrderProduct },
} = require("../server/db");

const seedUsers = [
  {
    id: 1,
    address: "123 main st",
    userType: "ADMIN",
    firstName: "Adam",
    lastName: "Min",
    email: "ownersEmail@oregano.com",
    password: "pw1",
  },
  {
    id: 2,
    address: "1 oak rd",
    userType: "USER",
    firstName: "Clark",
    lastName: "Kent",
    email: "shopper123@random.com",
    password: "pw2",
  },
  {
    id: 3,
    address: "23 Long rd",
    userType: "USER",
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@shopper.com",
    password: "pw3",
  },
  {
    id: 4,
    address: "45 franklin ave",
    userType: "USER",
    firstName: "Jill",
    lastName: "Jackson",
    email: "jjackson@shopper.com",
    password: "pw4",
  },
  {
    id: 5,
    address: "7 john st",
    userType: "USER",
    firstName: "Jan",
    lastName: "Doe",
    email: "janedoe@shopper.com",
    password: "pw5",
  },
];

// Products seed
const seedProducts = [
  {
    id: 1,
    category: "MEN",
    name: "Bamboo Pants",
    description: "Pants made out of bamboo",
    inventoryQuantity: 10,
    price: 100,
    imageURL:
      "https://cdn.shopify.com/s/files/1/0503/2601/2056/products/6_9a82250e-1b30-4aa7-8983-c1eb9627d491.jpg?v=1667418844&width=1800",
  },
  {
    id: 2,
    category: "WOMEN",
    name: "Bamboo Skirt",
    description: "Skirt made out of bamboo",
    inventoryQuantity: 45,
    price: 45,
    imageURL:
      "https://cdn.shopify.com/s/files/1/0503/2601/2056/products/11_c7d6c37f-c61d-42ad-9c06-583b7f2ddfbf.jpg?v=1667420871&width=1800",
  },
  {
    id: 3,
    category: "WOMEN",
    name: "Bamboo Longsleeve Shirt",
    description: "Long sleeve shirt made out of bamboo",
    inventoryQuantity: 20,
    price: 80,
    imageURL:
      "https://cdn.shopify.com/s/files/1/0503/2601/2056/products/10_af628f73-9a91-4cae-b51b-f0d3e0429494.jpg?v=1663864434&width=1800",
  },
  {
    id: 4,
    category: "MEN",
    name: "Silk T-shirt",
    description: "T-shirt made from silk.",
    inventoryQuantity: 35,
    price: 120,
    imageURL:
      "https://cdn.shopify.com/s/files/1/0503/2601/2056/products/RC1210M_HEATHEREDGREY_244_712eebd3-676b-4aba-8877-af5530485149.jpg?v=1655328410&width=1800",
  },
  {
    id: 5,
    category: "WOMEN",
    name: "Kale Shirt",
    description: "Eco-friendly Shirt made from kale.",
    inventoryQuantity: 10,
    price: 100,
    imageURL:
      "https://cdn.shopify.com/s/files/1/0503/2601/2056/products/22_05e19973-563e-435a-99a5-afc18b315835.jpg?v=1667421008&width=1800",
  },
  {
    id: 6,
    category: "MEN",
    name: "Recycled Hoodie",
    description: "Hoodie made from recycled materials",
    inventoryQuantity: 80,
    price: 180,
    imageURL:
      "https://cdn.shopify.com/s/files/1/0503/2601/2056/products/18_c600c1b0-64eb-485f-94a8-b322191b08d5.jpg?v=1667418905&width=1800",
  },
  {
    id: 7,
    category: "MEN",
    name: "Sweater for Men",
    description: "Sweater made from recycled clothes.",
    inventoryQuantity: 100,
    price: 110,
    imageURL:
      "https://cdn.shopify.com/s/files/1/0503/2601/2056/products/9_d0c2b564-c0e0-44f6-8581-178cb91ffe9c.jpg?v=1666276086&width=1800",
  },
  {
    id: 8,
    category: "WOMEN",
    name: "Recycled Cotton t-shirt",
    description: "Cotton t-shirt for women made from recycled materials.",
    inventoryQuantity: 450,
    price: 85,
    imageURL:
      "https://cdn.shopify.com/s/files/1/0503/2601/2056/products/3_8d83a9d1-d2b1-4cdc-b3f0-1b0f45cda5c5.jpg?v=1659566207&width=1800",
  },
  {
    id: 9,
    category: "WOMEN",
    name: "Button down long sleeve shirt",
    description:
      "Button down long sleeve shirt for women, made from organic and recycled materials.",
    inventoryQuantity: 75,
    price: 180,
    imageURL:
      "https://cdn.shopify.com/s/files/1/0503/2601/2056/products/59_8c1d9ce0-61de-4648-94ba-63cd2bb8e7f6.jpg?v=1661529250&width=1800",
  },
  {
    id: 10,
    category: "MEN",
    name: "Recycled cotton t-shirt",
    description: "Cotton t-shirt made from recycled clothing.",
    inventoryQuantity: 35,
    price: 120,
    imageURL:
      "https://cdn.shopify.com/s/files/1/0503/2601/2056/products/DAY02_S01210_BLACK_093_99dafa7c-9780-416c-bbce-570aeda9db24.jpg?v=1666631727&width=1800",
  },
  {
    id: 11,
    category: "WOMEN",
    name: "Women Joggers",
    description: "Recycled fleece joggers for women",
    inventoryQuantity: 105,
    price: 105,
    imageURL:
      "https://cdn.shopify.com/s/files/1/0503/2601/2056/products/29_ccd0b5df-0bca-4b8c-b58c-ed64ded2d3df.jpg?v=1659564501&width=1800",
  },
  {
    id: 12,
    category: "MEN",
    name: "Recycled button down Long sleeve",
    description:
      "Button down long sleeve shirt made from recycled materials, while still being fashionable.",
    inventoryQuantity: 90,
    price: 190,
    imageURL:
      "https://cdn.shopify.com/s/files/1/0503/2601/2056/products/1_FRONT_bc1962cf-d0b5-41d7-91d0-53e12dab741d.jpg?v=1664914847&width=1800",
  },
  {
    id: 13,
    category: "WOMEN",
    name: "Recycled Denim Overalls",
    description: "Womens overalls made from recycled denim",
    inventoryQuantity: 45,
    price: 200,
    imageURL:
      "https://cdn.shopify.com/s/files/1/0503/2601/2056/products/81.jpg?v=1659648533&width=1800",
  },
  {
    id: 14,
    category: "MEN",
    name: "Zip-up Hoodie",
    description: "Zip-up hoodie made from recycled materials",
    inventoryQuantity: 24,
    price: 90,
    imageURL:
      "https://cdn.shopify.com/s/files/1/0503/2601/2056/products/17_ee811f73-dcfb-4710-b123-88fc0d0d54b9.jpg?v=1666276545&width=1800",
  },
  {
    id: 15,
    category: "MEN",
    name: "Where's Waldo Short sleeve",
    description: "Men ",
    inventoryQuantity: 79,
    price: 50,
    imageURL:
      "https://cdn.shopify.com/s/files/1/0503/2601/2056/products/21_4f16ede5-b62c-4edf-907a-3f7876fd4647.jpg?v=1660932083&width=1800",
  },
  {
    id: 16,
    category: "MEN",
    name: "Men's Field Jacket",
    description: "Men's field jacket made from recycled and organic materials.",
    inventoryQuantity: 90,
    price: 200,
    imageURL:
      "https://cdn.shopify.com/s/files/1/0503/2601/2056/products/330029U_BLACK_296_6e61645a-8e50-42ef-85f9-fb98b6f04abb.jpg?v=1655908923&width=1800",
  },
  {
    id: 17,
    category: "MEN",
    name: "Men's Joggers",
    description: "Men's joggers made from recycled materials.",
    inventoryQuantity: 64,
    price: 60,
    imageURL:
      "https://cdn.shopify.com/s/files/1/0503/2601/2056/products/650010M_BLACK_150.jpg?v=1649271642&width=1800",
  },
  {
    id: 18,
    category: "MEN",
    name: "Men's Jogger Shorts",
    description: "Men's jogger shorts made from recycled materials.",
    inventoryQuantity: 190,
    price: 45,
    imageURL:
      "https://cdn.shopify.com/s/files/1/0503/2601/2056/products/350022U_BLACK_b6bcdc62-b939-4271-b293-6c2f34ca39cc.jpg?v=1655479216&width=1800",
  },
];

// Oders seed
const seedOrders = [
  {
    id: 1,
    date: "2022-11-09 12:55:26",
    isCart: true,
    userId: 1,
  },
  {
    id: 2,
    date: "2022-11-09 10:01:04",
    isCart: true,
    userId: 2,
  },
];

const seedOrderProduct = [
  {
    orderId: 1,
    productId: 1,
    quantity: 2,
  },
  {
    orderId: 1,
    productId: 4,
    quantity: 1,
  },
  {
    orderId: 1,
    productId: 2,
    quantity: 3,
  },
  {
    orderId: 2,
    productId: 2,
    quantity: 2,
  },
  {
    orderId: 2,
    productId: 3,
    quantity: 4,
  },
  {
    orderId: 2,
    productId: 5,
    quantity: 1,
  },
  {
    orderId: 3,
    productId: 5,
    quantity: 1,
  },
];

// seed function
const seed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all(
      seedUsers.map((data) => {
        return User.create(data);
      })
    );
    await Promise.all(
      seedProducts.map((prod) => {
        return Product.create(prod);
      })
    );
    await Promise.all(
      seedOrders.map((order) => {
        return Order.create(order);
      })
    );
    await Promise.all(
      seedOrderProduct.map((orderProd) => {
        return OrderProduct.create(orderProd);
      })
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green("Seeding success!"));
      db.close();
    })
    .catch((err) => {
      console.error(red("Oh noes! Something went wrong!"));
      console.error(err);
      db.close();
    });
}
