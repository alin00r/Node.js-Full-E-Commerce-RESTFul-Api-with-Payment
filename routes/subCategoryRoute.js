const express = require("express");
const {
    createSubCategory,
    getSubCategories,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory,
    setCategoryIdToBody,
    createfilterObject,
} = require("../controllers/subCategoryController");
const {
    createSubCategoryValidator,
    getSubCategoryValidator,
    updateSubCategoryValidator,
    deleteSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");

const authController = require("../controllers/authController");

// Acces params in other Routers
const router = express.Router({ mergeParams: true });

router
    .route("/")
    .get(createfilterObject, getSubCategories)
    .post(
        authController.Protect,
        authController.allowedTo("admin", "manager"),
        setCategoryIdToBody,
        createSubCategoryValidator,
        createSubCategory
    );

router
    .route("/:id")
    .get(getSubCategoryValidator, getSubCategory)
    .put(
        authController.Protect,
        authController.allowedTo("admin", "manager"),
        updateSubCategoryValidator,
        updateSubCategory
    )
    .delete(
        authController.Protect,
        authController.allowedTo("admin"),
        deleteSubCategoryValidator,
        deleteSubCategory
    );
module.exports = router;