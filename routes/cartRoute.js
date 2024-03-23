const express = require("express");
const {
    clearCart,
    applyCoupon,
    addProductToCart,
    getLoggedUserCart,
    removeSpecificCartItem,
    updateCartItemQuantity,
} = require("../controllers/cartController");

const authController = require("../controllers/authController");

const router = express.Router();
router.use(authController.Protect, authController.allowedTo("user"));

router
    .route("/")
    .get(getLoggedUserCart)
    .post(addProductToCart)
    .delete(clearCart);
router.route("/applyCoupon").put(applyCoupon);
router
    .route("/:itemId")
    .delete(removeSpecificCartItem)
    .put(updateCartItemQuantity);

module.exports = router;