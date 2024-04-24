# E-shtery-app

###

Node.js-Full-E-Commerce-RESTFul-API-with- Cash and Online Payment

## Technologies

<div>
    
  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD) ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white) ![MONGODB](https://img.shields.io/badge/mongodb-6DA55F?style=for-the-badge&logo=mongodb&logoColor=white) ![MONGOOSE](https://img.shields.io/badge/MONGOOSE-ff0000?style=for-the-badge&logo=MONGOOSE&logoColor=white) 
    ![stripe](https://img.shields.io/badge/stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)
  ![dotenv](https://img.shields.io/badge/dotenv-3982CE?style=for-the-badge&logo=dotenv&logoColor=white1)
  ![swagger](https://img.shields.io/badge/swagger-00FF00?style=for-the-badge&logo=swagger&logoColor=white)
  ![eslint](https://img.shields.io/badge/eslint-8A118C?style=for-the-badge&logo=eslint&logoColor=white)
  ![prettier](https://img.shields.io/badge/prettier-8A118C?style=for-the-badge&logo=prettier&logoColor=white)
  
  <br>
  <center>
  
  <img src="https://camo.githubusercontent.com/2dbe8dc3b8fa5ac59437c9d8c94323ad3f0052d3ff5ac0e9c258ceb5daba76f8/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f31362e332e312d646f74656e762d726564">

  <img src="https://camo.githubusercontent.com/a3ff2a5d02a913cdf673537dea66873aecaf58cb8c770f9225e2d2959712ed6b/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f312e342e352d2d6c74732e312d6d756c7465722d726564">
  <img src="https://camo.githubusercontent.com/e098806c441efac8d7c44cbb0cf5000f113dfc54db28d16bbfcbeddc3ba316ed/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f312e31302e302d6d6f7267616e2d726564">
  <img src="https://camo.githubusercontent.com/b9fe7b2faa1b963c1d1b77ee18a4a7689a0d46d18cf38a48ae464f2a03357eba/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f362e392e342d6e6f64656d61696c65722d726564">
  <img src="https://camo.githubusercontent.com/2aa8d320fc8552d10a9f66e1076360d1f0c9ef2ee5adaea034cd13f68ca1efdc/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f352e312e302d6263727970742d726564">
  <img src="https://camo.githubusercontent.com/f73e41f53709208ed3f07c001ccb103454212e26e6d296fa823e02cde579b205/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f312e322e302d657870726573732d2d6173796e632d2d68616e646c65722d726564">
  <img src="https://camo.githubusercontent.com/bdd58addfeff8b18867ab6606b24bd158319885f8c1918ec13c5786259b6c5ab/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f372e302e312d657870726573732d2d76616c696461746f722d726564">

  </center>
</dev>

## **Key Features:**

- **User Authentication:** Secure user authentication endpoints using JWT tokens.
- **Category Management:** Create, retrieve, update, and delete categories for organizing products.
- **Subcategory Management:** Manage subcategories to further refine product classifications.
- **Brand Management:** Maintain brands for product attribution and categorization.
- **Product Management:** Comprehensive CRUD operations for products, including creation, retrieval, updating, and deletion.
- **User Management:** Manage user accounts, including registration, authentication, and profile updates.
- **Review System:** Enable users to leave reviews for products, with options for retrieval and moderation.
- **Wishlist Functionality:** Allow users to create and manage wishlists for future purchases.
- **Address Management:** Facilitate the management of user addresses for accurate shipping and billing information.
- **Coupon Management:** Implement coupon functionality for discounts on products or orders.
- **Shopping Cart:** Provide users with a shopping cart feature to collect and manage selected items before checkout.
- **Order Processing:** Enable users to place and track orders, with functionalities for order creation, retrieval, and status updates.
- **Payment Integration:** Support both online payment methods and cash on delivery options for seamless transaction processing.
- **API Documentation:** Integrated Swagger UI for easy access to API documentation, enhancing development and collaboration processes.
- **Middleware Mounting:** Modular function for mounting routes and middleware onto the Express application instance, ensuring proper registration and accessibility.
- **Scalability:** Modular structure and organization of routes facilitate scalability, allowing for the addition of new features or endpoints in a structured and manageable manner.

## Installation

1. **Clone the Repository:**
   Use the `git clone` command to clone the GitHub repository to your local machine.
   ```bash
   git clone https://github.com/alin00r/Node.js-Full-E-Commerce-RESTFul-App-with-Payment
   ```
2. **Initialize a Package.json File (if not already done):**
   If your project doesn't already have a `package.json` file, you can create one by running:
   ```bash
   npm init
   # or
   yarn init
   ```
3. **Install depends**
   ```bash
      npm install
   ```
4. **Setting up env variables**<br>

   - **Please first specifiy your database engine**

   ```properties
   ## PORT
   PORT=YOUR PORT HERE

   ## MongoDB URI
   DB_URI= YOUR DATABASE URI

   ## JWT access token
   JWT_SECRET_KEY=YOUR JWT ACCESS TOKEN SECRET
   JWT_EXPIRE_TIME=YOUR JWT EXPIRE TIME

   ## GMAIL
   MAILER_APP_EMAIL=SENDER EMAIL
   MAILER_APP_PASSWORD=SENDER PASSWORD

   ## STRIPE
   STRIPE_SECRET=Your STRIPE SECRET KEY
   STRIPE_WEBHOOK_SECRET=Your STRIPE WEBHOOK SECRET KEY

   ```

## Routes

### Auth Routes

`@access Public`
| Route | Path | Description | Body | Params |
| ------| -------------------------- | ------------------------------------- | -----------------------------------------------| ------- |
| POST | `/api/v1/signup` | Create Account | `name`,`email` `password`, `passwordConfirm` | none |
| POST | `/api/v1/login` | Login with exist user | `email`,`password` | none |
| POST | `/api/v1/forgotPassword` | request code to reset your password | `email` | none |
| POST | `/api/v1/verifyResetCode` | verify Reset Code | `resetCode`, | none |
| PUT | `/api/v1/resetPassword` | Reset your new password | `email`, `newPassword` | none |

### Categories Routes

`@access Admin`
| Route | Path | Description | Body | Params |
| ------ | -------------------------- | ------------------------------------- | --------------------------| ---------- |
| POST | `/api/v1/categories` | Create Category |`name`,`image` | none |
| GET | `/api/v1/categories` | Get All Categories | none | none |
| GET | `/api/v1/categories/:id` | Get Category with id | none | Category Id |
| PATCH | `/api/v1/categories/:id` | Update Category with id | none | Category Id |
| DELETE | `/api/v1/categories/:id` | Delete Category with id | none | Category Id |

### SubCategories Routes

`@access Admin`
| Route | Path | Description | Body | Params |
| ------ | ----------------------------- | ------------------------------------- | --------------------------| ------------- |
| POST | `/api/v1/Subcategories` | Create SubCategory |`name`,`image` | none |
| GET | `/api/v1/Subcategories` | Get All SubCategories | none | none |
| GET | `/api/v1/Subcategories/:id` | Get SubCategory with id | none | SubCategory Id |
| PATCH | `/api/v1/Subcategories/:id` | Update SubCategory with id | none | SubCategory Id |
| DELETE | `/api/v1/Subcategories/:id` | Delete SubCategory with id | none | SubCategory Id |

### Brands Routes

`@access Admin`
| Route | Path | Description | Body | Params |
| ------ | ----------------------------- | ------------------------------------- | --------------------------| -------- |
| POST | `/api/v1/brands` | Create brand |`name`,`image` | none |
| GET | `/api/v1/brands` | Get All brands | none | none |
| GET | `/api/v1/brands/:id` | Get brand with id | none | brand Id |
| PATCH | `/api/v1/brands/:id` | Update brand with id | `name`,`image` | brand Id |
| DELETE | `/api/v1/brands/:id` | Delete brand with id | none | brand Id |

### Categories/Subs

`@access Admin`
| Route | Path | Description | Body | Params |
| ------ | --------------------------------------------- | ----------------------------------------------- | --------------------------| ------------ |
| GET | `/api/v1/categories/:categoryId/subcategories` | Get list of subcategories for specific category |none | `categoryId` |
| POST | `/api/v1/categories/:categoryId/subcategories` | Create subcategory on category |`name`,`image` | `categoryId` |

### Products Routes

`@access Admin`
| Route | Path | Description | Body | Params |
| ------ | ----------------------------- | ------------------------------------- | ---------------------------------------------------| -------- |
| POST | `/api/v1/products`| Create Product |`title`,`slug`,`quantity`, | none |
| | | |`sold`,`price`,`priceAfterDiscount`, | |
| | | |`description`,`category`,`imageCover`, | |
| | | |`ratingsAverage`,`ratingsQuantity`,`subcategories` | | | GET | `/api/v1/products` | Get All Products | none | none |
| GET | `/api/v1/products/:id` | Get Product with id | none | Product Id |
| PATCH | `/api/v1/products/:id` | Update Product with id |`title`,`slug`,`quantity`, | Product Id |
| | | |`sold`,`price`,`priceAfterDiscount`, | none |
| | | |`description`,`category`,`imageCover`, | |
| | | |`ratingsAverage`,`ratingsQuantity`,`subcategories` | |
| DELETE | `/api/v1/products/:id` | Delete Product with id | none | Product Id |

- **ENUMS** <br>
  This schema defines two enums:

1. `Role`: Represents the role of a user with two possible values:

- `USER`: Indicates a regular user.
- `ADMIN`: Indicates an administrator user.
- `MANAGER`: Indicates an administrator user but he can't delete anything on the server.

## `to browse all routes see Api Rutes on Swagger`

## Swagger Docs

```
https://app.swaggerhub.com/apis-docs/ALINOORSPAM/Eshtery/1.0.0

```
