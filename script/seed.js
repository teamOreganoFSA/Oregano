const { green, red } = require('chalk');
const { db, models: { User, Product,Order,OrderProduct} } = require('../server/db');

const seedUsers = [
  {
    address: '123 main st',
    userType: 'Admin',
    firstName: 'Adam',
    lastName: 'Min',
    email: 'ownersEmail@oregano.com',
    password: 'password'
  },
  {
    address: '1 oak rd',
    userType: 'User',
    firstName: 'Clark',
    lastName: 'Kent',
    email: 'shopper123@random.com',
    password: 'password',
  },
  {
    address: '23 Long rd',
    userType: 'User',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@shopper.com',
    password: 'password',
  },
  {
    address: '45 franklin ave',
    userType: 'User',
    firstName: 'Jill',
    lastName: 'Jackson',
    email: 'jjackson@shopper.com',
    password: 'password',
  },
  {
    address: '7 john st',
    userType: 'User',
    firstName: 'Jan',
    lastName: 'Doe',
    email: 'janedoe@shopper.com',
    password: 'password',
  },

]


// Products seed
const seedProducts = [
  {
    category: 'MEN',
    name: 'Bamboo Pants',
    description: 'Pants made out of bamboo',
    inventoryQuantity: 10,
    price: 100,
    imageURL: 'https://cdn.shopify.com/s/files/1/0503/2601/2056/products/6_9a82250e-1b30-4aa7-8983-c1eb9627d491.jpg?v=1667418844&width=1800',
  },
  {
    category: 'WOMEN',
    name: 'Bamboo Skirt',
    description: 'Skirt made out of bamboo',
    inventoryQuantity: 45,
    price: 45,
    imageURL: 'https://cdn.shopify.com/s/files/1/0503/2601/2056/products/11_c7d6c37f-c61d-42ad-9c06-583b7f2ddfbf.jpg?v=1667420871&width=1800'
  },
  {
    category: 'WOMEN',
    name: 'Bamboo Longsleeve Shirt',
    description: 'Long sleeve shirt made out of bamboo',
    inventoryQuantity: 20,
    price: 80,
    imageURL: 'https://cdn.shopify.com/s/files/1/0503/2601/2056/products/10_af628f73-9a91-4cae-b51b-f0d3e0429494.jpg?v=1663864434&width=1800'
  },
  {
    category: 'MEN',
    name: 'Silk T-shirt',
    description: 'T-shirt made from silk.',
    inventoryQuantity: 35,
    price: 120,
    imageURL: 'https://cdn.shopify.com/s/files/1/0503/2601/2056/products/RC1210M_HEATHEREDGREY_244_712eebd3-676b-4aba-8877-af5530485149.jpg?v=1655328410&width=1800'
  },
  {
    category: 'WOMEN',
    name: 'Kale Shirt',
    description: 'Eco-friendly Shirt made from kale.',
    inventoryQuantity: 10,
    price: 100,
    imageURL: 'https://cdn.shopify.com/s/files/1/0503/2601/2056/products/22_05e19973-563e-435a-99a5-afc18b315835.jpg?v=1667421008&width=1800'
  }
]

// Oders seed
const seedOrders = [
  {
    date: '2022-11-09 12:55:26',
    isCart: true,
    userId: 1
  },
  {
    date: '2022-11-09 10:01:04',
    isCart: true,
    userId: 2
  },
  {
    date: '2022-11-09 15:33:31',
    isCart: true,
    userId: 2
  }
]

const seedOrderProduct = [
  {
    orderId: 1,
    productId: 1,
    quantity: 2
  },
  {
    orderId: 1,
    productId: 4,
    quantity: 1
  },
  {
    orderId: 1,
    productId: 2,
    quantity: 3
  },
  {
    orderId: 2,
    productId: 2,
    quantity: 2
  },
  {
    orderId: 2,
    productId: 3,
    quantity: 4
  },
  {
    orderId: 2,
    productId: 5,
    quantity: 1
  },
  {
    orderId: 3,
    productId: 1,
    quantity: 2
  },
  {
    orderId: 3,
    productId: 2,
    quantity: 5
  }
]

// seed function
const seed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all(seedUsers.map(data => {
      return User.create(data);
    }))
    await Promise.all(seedProducts.map(prod => {
      return Product.create(prod);
    }))
    await Promise.all(seedOrders.map(order => {
      return Order.create(order);
    }))
    await Promise.all(seedOrderProduct.map(orderProd => {
      return OrderProduct.create(orderProd);
    }))
  } catch (err) { console.error(err) }
}

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
    .catch(err => {
      console.error(red("Oh noes! Something went wrong!"));
      console.error(err);
      db.close();
    });
}
