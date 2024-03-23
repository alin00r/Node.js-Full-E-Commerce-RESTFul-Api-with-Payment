const express = require("express");
const {
    getBrandValidator,
    updateBrandValidator,
    deleteBrandValidator,
    createBrandValidator,
} = require("../utils/validators/brandValidator");
const {
    getBrands,
    createBrand,
    getBrand,
    updateBrand,
    deleteBrand,
    uploadBrandImage,
    resizeImage,
} = require("../controllers/brandController");

const authController = require("../controllers/authController");

const router = express.Router();

router
    .route("/")
    .get(getBrands)
    .post(
        authController.Protect,
        authController.allowedTo("admin", "manager"),
        uploadBrandImage,
        resizeImage,
        createBrandValidator,
        createBrand
    );
router
    .route("/:id")
    .get(getBrandValidator, getBrand)
    .put(
        authController.Protect,
        authController.allowedTo("admin", "manager"),
        uploadBrandImage,
        resizeImage,
        updateBrandValidator,
        updateBrand
    )
    .delete(
        authController.Protect,
        authController.allowedTo("admin"),
        deleteBrandValidator,
        deleteBrand
    );

module.exports = router;