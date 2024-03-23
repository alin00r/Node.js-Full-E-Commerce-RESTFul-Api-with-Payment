const factory = require("./handlersFactory");
const SubCategory = require("../models/subCategoryModel");

exports.setCategoryIdToBody = (req, res, next) => {
    //Nested route (Create)
    if (!req.body.category) req.body.category = req.params.categoryId;
    next();
};

// @desc   Create subcategory
// @route  POST /api/v1/subcategories
// @access Private
exports.createSubCategory = factory.createOne(SubCategory);

// @desc  Get list of subcategories for specific category
// @route GET /api/v1/categories/:categoryId/subcategories
exports.createfilterObject = (req, res, next) => {
    let filterObject = {};
    if (req.params.categoryId) {
        filterObject = { category: req.params.categoryId };
    }
    req.filterObject = filterObject;
    next();
};

// @desc  Get list of subcategories
// @route GET /api/v1/subcategories
// @access Public
exports.getSubCategories = factory.getAll(SubCategory);

// @desc  Get specific sub category by id
// @route GET /api/v1/subcategories/:id
// @access Public
exports.getSubCategory = factory.getOne(SubCategory);

// @desc  Update specific Subcategory
// @route PUT /api/subcategories/:id
// @acess Private
exports.updateSubCategory = factory.updateOne(SubCategory);

// @desc  Delete specific Subcategory
// @route Delete /api/subcategories/:id
// @acess Private
exports.deleteSubCategory = factory.deleteOne(SubCategory);