const express = require("express");
const {
    getProductValidator,
    createProductValidator,
    deleteProductValidator,
    updateProductValidator,
} = require("../utils/validators/productValidator");
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadProductImages,
    resizeProductImages,
} = require("../controllers/productController");

const authController = require("../controllers/authController");
const reviewsRoute = require("./reviewRoute");

const router = express.Router();

// POST  /products/564564445554/reviews
// GET  /products/564564445554/reviews
// GET  /products/564564445554/reviews/02646646565
router.use("/:productId/reviews", reviewsRoute);

router
    .route("/")
    .get(getProducts)
    .post(
        authController.Protect,
        authController.allowedTo("admin", "manager"),
        uploadProductImages,
        resizeProductImages,
        createProductValidator,
        createProduct
    );
router
    .route("/:id")
    .get(getProductValidator, getProduct)
    .put(
        authController.Protect,
        authController.allowedTo("admin", "manager"),
        uploadProductImages,
        resizeProductImages,
        updateProductValidator,
        updateProduct
    )
    .delete(
        authController.Protect,
        authController.allowedTo("admin"),
        deleteProductValidator,
        deleteProduct
    );

module.exports = router;