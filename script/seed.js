const { green, red } = require('chalk');
const { db, models: { User, Product } } = require('../server/db');
const seedUsers = [
  {
    firstName: 'Adam',
    lastName: 'Min',
    email: 'ownersEmail@oregano.com',
    password: 'password',
    address: '123 main st',
    userType: 'ADMIN',
  },
  {
    firstName: 'Clark',
    lastName: 'Kent',
    email: 'shopper123@random.com',
    password: 'password',
    address: '1 oak rd',
    userType: 'USER',
  }
]
const seedProducts = [
  {
    name: 'Bamboo Pants',
    description: 'Pants made out of bamboo',
    inventoryQuantity: 10,
    price: 100,
    imageURL: 'http://www.sunprecautions.com/content/images/products/23600-1_9576_900x1200_100.jpg'
  },
  {
    name: 'Bamboo Longsleeve Shirt',
    description: 'Long sleeve shirt made out of bamboo',
    inventoryQuantity: 20,
    price: 80,
    imageURL: 'http://tshirtluver.com/image/cache/bamboo-t-shirt-tlts00011bambootshirt-800x885.jpg'
  },
  {
    name: 'Silkworm Shirt',
    description: 'Longsleeve shirt made from silk.',
    inventoryQuantity: 35,
    price: 120,
    imageURL: 'https://dm1ll01jrnse4.cloudfront.net/optimize/opti_755486098_img1.jpg'
  },
  {
    name: 'Kale t-shirt',
    description: 'Eco-friendly t-shirt made from kale.',
    inventoryQuantity: 10,
    price: 100,
    imageURL: 'https://assets-global.website-files.com/5ccc8aa73871f9d0b1c81c04/61323cc015db8e5d998b1950_2099.jpg'
  }
]
const seed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all(seedUsers.map(data => {
      return User.create(data);
    }))
    await Promise.all(seedProducts.map(prod => {
      return Product.create(prod);
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
