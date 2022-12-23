# Grace-Shopper
E-Commerce website Oregano focuses on selling organic clothing. check out the rendered site at https://oregano-grace-shopper.onrender.com/
Youtube walk through demo here https://www.youtube.com/watch?v=aiHeqQPkguE
## Setup

* Update project name and description in `package.json`
* `npm install`
* Create two postgres databases (`MY_APP_NAME` should match the `name`
  parameter in `package.json`):
* These commands will create both your **development** and **test** databases

```
createdb <YOUR APP NAME HERE FROM package.json>
createdb <YOUR APP NAME HERE FROM package.json>-test
```

* By default, running `npm test` will use your test database, while
  regular development uses development database

## Start

Sync and seed your database by running `npm run seed`. Running `npm run start:dev` will make great things happen!

- start:dev will both start your server and build your client side files using webpack
- start:dev:logger is the same as start:dev, but you will see your SQL queries (can be helpful for debugging)
- start:dev:seed will start your server and also seed your database (this is useful when you are making schema changes and you don't want to run your seed script separately)
# Grace Shopper Tiers

## Tier 1: MVP Shopping Experience

### As a customer/visitor, I want to be able to:

- X access a deployed version of the website so I can browse and purchase products.
- X view all available products so I can pick from a variety.
- X view a single product so I can see more details.
- X (local storage needs work) add a product to my cart so I can collect my desired products in one place.
- x (local storage needs work) edit my cart if I change my mind:
  - x (local storage needs work) change the quantity of a product in my cart.
  - x (local storage needs work) remove a product in my cart.
  - X _No one else should be able to edit my cart except me._
- (frontend page) "checkout" the items in my cart so I can purchase my desired goods.
  - (local storage needs work) _Think of a typical user experience on popular websites from a guest user and logged-in user perspective._
  - (have users info autfilled, guest still needs to fill out their info) _You can just start with by simulating the experience of checking out with a simple confirmation page._
- create an account so I can have a logged-in experience.

### As a logged-in customer, I want to be able to:

- X have a persistent cart so I can revisit and pick up where I left off.
  - X _Logged-in-user across multiple devices: I'm logged in on my mobile device and add some items to my cart. When I open the browser on my laptop and log in, I want to see those items in my cart._
  -X  _No one else should be able to edit my cart except me._

### As an administrator, I want to be able to:

- have validated data to ensure reliability.
  - _i.e. each customer that creates an account should only be able to do so once with a single email address._
- (need to work on add and remove product) have full rights to make backend requests to add, edit, and remove products.
  - X _No one else should have access._
- view user information.
  - _No one else should have access._

### As an engineer, I want to:

- X have a well-seeded database so that I am able to simulate a number of different scenarios for the user stories below.
  - X _By doing this, you really set yourselves up to tackle many of the points throughout the tiers. In the long run, this will save you, potentially, tons of time._
  - X _For example, seed hundreds of products with dummy data so that when you get to the “pagination” user story, you won’t have to worry about adding more products._
  - X _Likewise, add a bunch of users with products in their carts so editing the cart can be worked on without already having the “add to cart” functionality built out._
- X user data to be secure so that no one can unrightfully manipulate information.

## TIER 2: E-Commerce Essentials

<details><summary>Click Here To Open</summary>

### As a customer, I want to be able to:

- X see all products that belong to a certain category.
  - X _Keep this simple. For example, a product can only belong to one category._
- explore an aesthetically pleasing website so I can easily navigate around and enjoy the experience (UI/UX).
  - X _This includes front-end data validations. For example, if certain fields of a form are required and must be in a specific format, this is obvious to the user._
- X have a persistent cart so I can revisit and pick up where I left off.
  - _There are two more experiences to consider here. Explore your favorite websites to see what the intended behavior is for the following cases:_
    - X **Guest-only:** I don't want to create an account, but I want my cart to persist between browser refreshes.
      - X Look into front-end storage for this one.
    - x KINDA **Guest-to-logged-in-user:** Initially, I'm not logged in, and I add items to my cart. When I eventually log in, I want to see those same items I added when I was logged in still in my cart, in addition to the items I may have had in my cart from a previous logged in session.

### As a logged-in customer, I want to be able to:

- see my order history so I can remember my previously purchased items and their prices at the time of purchase.
- x view and edit my user profile so I can update my information when necessary.

### As an administrator, I want to be able to:

- allow customers to have a variety of payment method options in order to increase checkout conversion.
  - _Begin by integrating Stripe, and, if interested, dive into integrating PayPal, Venmo, Braintree, or Bitcoin._
- x edit products and manage users through a dashboard so I can easily make changes and assessments as necessary.

</details>

## TIER 3: Extra Features & Flair

<details><summary>Click Here To Open</summary>

### As an administrator, I want to be able to:

- ensure accurate product inventory so that we can be sure only available products are sold.
  - _For example, when a customer purchases an item, the quantity available is appropriately deducted._
  - _Likewise, if a customer attempts to purchase a higher quantity of an item that is available, they will be alerted/notified that there isn't enough inventory._
- offer customers discounts through promo codes so that we can incentivize purchases.

### As a customer, I want to be able to:

#### Receive Notifications

- receive an email confirmation when placing an order so that I can easily reference it when needed without visiting my account.
- be notified when certain events occur so that I am informed of my actions.
  - _For example, when I add a product to my cart, there is a toast notification that pops up in the corner of the page with an appropriate message for that action._

#### Have A Seamless Experience

- navigate the website successfully, in a way that is accessible and inclusive.
  - _This is a great opportunity to dive into ADA Compliance (screen-reader friendliness, keyboard navigation, colorblind-friendly, etc.)._
  - _[A11y Checklist](https://a11yproject.com/checklist)_
- view a display to know when content is loading or there is an error so that I can manage my expectations.
  - _For example, loading spinners while the frontend is waiting for a backend response._
  - _As a customer, if I visit a product page that doesn't exist, notify me that it doesn't and bring me to all products. Likewise, if I visit a page that outright doesn't exist, navigate me to the landing page._

#### Have A User-Friendly Experience

- filter through all products.
  - _This is an opportunity to dive into a "search" input field. You can filter all products using vanilla JavaScript, or look into Algolia (search-as-a-service)._
- browse through all products in a digestible way so that I am not overwhelmed with an endless list of products.
  - _Dive into pagination here!_
  - _This goes back to the initial seed in Tier 1. If you have a database seeded with thousands of products, there shouldn't be any blockers in order to tackle this user story. It also begs the question of whether we should fetch all of the products from the database or limit the response in intervals (e.g. 25 at a time) and show more only through a user action (e.g. clicking a “Next”/”Show More” button)._
  - _Keep in mind, if you already have the product filter feature built out, can you get pagination to work on the results as well?_
- view featured products so that I can get inspiration.
  - _For example, display the five most purchased products within a given period of time (i.e. yesterday or last week), or the most recently added products._
- add products to a wishlist so that I can differentiate products I would like to purchase now (cart) versus products I might be interested in purchasing in the future (wishlist).

</details>

## TIER 4: S Tier

<details><summary>Click Here To Open</summary>

### As a customer, I want to be able to:

- post products to my social media accounts so that I can share with my friends/followers.
  - _For example, integrating Facebook to create a post of a product's name, description, photo and link._
- receive recommended products so that I can have a customized user experience and get inspiration.
  - _For example, based on products viewed (similar products; matching "tags")._
- feel like the website experience is customized for my native language.
  - **Internationalization (i19n)**
    - _The process of designing and building an application to facilitate localization. The main concern is that applications can be adapted to various languages and regions without engineering changes._
  - **Localization (i10n)**
    - _The cultural and linguistic adaptation of an internationalized application to two or more culturally-distinct markets._
    - _For example, the website while the main language of the United States and United Kingdom is English, the currency ($ vs. £) and date format (12/31/2020 vs. 31/12/2020) vary._
  - _[Mozilla Internationalization & Localization Guidelines](https://www-archive.mozilla.org/docs/reflist/i18n/)_

### As an administrator, I want to be able to:

- visualize relevant KPIs (key performance indicators) in the admin dashboard so that I can make educated business decisions.
  - _For example, a line graph of total sales over time._

### As a CEO/CTO, I want:

- the website to allow for multi tenancy so that we can potentially white label the application and allow users to create "shops."
  - _Think Etsy and Amazon, where the sellers can have their own "shops" within the platforms._

</details>

