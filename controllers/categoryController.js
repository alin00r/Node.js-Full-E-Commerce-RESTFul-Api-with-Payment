const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");

const Category = require("../models/categoryModel");
const factory = require("./handlersFactory");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");

// Upload Single Image
exports.uploadCategoryImage = uploadSingleImage("image");
// Image Processing
exports.resizeImage = asyncHandler(async(req, res, next) => {
    const fileName = `category-${uuidv4()}-${Date.now()}.jpeg`;
    if (req.file) {
        await sharp(req.file.buffer)
            .resize(600, 600)
            .toFormat("jpeg")
            .jpeg({ quality: 95 })
            .toFile(`uploads/categories/${fileName}`);
        // Save image to database
        req.body.image = fileName;
    }

    next();
});

// @desc  Get list of categories
// @route GET /api/v1/categories
// @access Public
exports.getCategories = factory.getAll(Category);

// @desc  Get specific category by id
// @route GET /api/v1/categories/:id
// @access Public
exports.getCategory = factory.getOne(Category);
// @desc  Create category
// @route POST /api/v1/categories
// @access Private
exports.createCategory = factory.createOne(Category);

// @desc  Update specific category
// @route PUT /api/categories/:id
// @acess Private
exports.updateCategory = factory.updateOne(Category);

// @desc  Delete specific category
// @route Delete /api/categories/:id
// @acess Private
exports.deleteCategory = factory.deleteOne(Category);