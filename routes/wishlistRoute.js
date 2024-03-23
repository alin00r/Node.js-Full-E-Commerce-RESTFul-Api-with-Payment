const express = require("express");
const {
    addProductToWishlist,
    removeProductToWishlist,
    getLoggedUserWishlist,
} = require("../controllers/wishlistController");

const authController = require("../controllers/authController");

const router = express.Router();
router.use(authController.Protect, authController.allowedTo("user"));

router.route("/").get(getLoggedUserWishlist).post(addProductToWishlist);

router.route("/:productId").delete(removeProductToWishlist);

module.exports = router;