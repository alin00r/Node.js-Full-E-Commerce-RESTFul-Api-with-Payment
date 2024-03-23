const express = require("express");
const {
    getCategoryValidator,
    updateCategoryValidator,
    deleteCategoryValidator,
    createCategoryValidator,
} = require("../utils/validators/categoryValidator");
const {
    getCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory,
    resizeImage,
    uploadCategoryImage,
} = require("../controllers/categoryController");

const authController = require("../controllers/authController");

const subcategoriesRoute = require("./subCategoryRoute");

const router = express.Router();

router.use("/:categoryId/subcategories", subcategoriesRoute);

router
    .route("/")
    .get(getCategories)
    .post(
        authController.Protect,
        authController.allowedTo("admin", "manager"),
        uploadCategoryImage,
        resizeImage,
        createCategoryValidator,
        createCategory
    );
router
    .route("/:id")
    .get(getCategoryValidator, getCategory)
    .put(
        authController.Protect,
        authController.allowedTo("admin", "manager"),
        uploadCategoryImage,
        resizeImage,
        updateCategoryValidator,
        updateCategory
    )
    .delete(
        authController.Protect,
        authController.allowedTo("admin"),
        deleteCategoryValidator,
        deleteCategory
    );

module.exports = router;