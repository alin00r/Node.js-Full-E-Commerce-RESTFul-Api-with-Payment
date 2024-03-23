const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const Brand = require("../models/brandModel");
const factory = require("./handlersFactory");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");

// Upload Single Image
exports.uploadBrandImage = uploadSingleImage("image");
// Image Processing
exports.resizeImage = asyncHandler(async(req, res, next) => {
    const fileName = `brand-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
        .resize(600, 600)
        .toFormat("jpeg")
        .jpeg({ quality: 95 })
        .toFile(`uploads/brands/${fileName}`);
    req.body.image = fileName;
    next();
});
// @desc  Get list of Brands
// @route GET /api/v1/brands
// @access Public
exports.getBrands = factory.getAll(Brand);

// @desc  Get specific brand by id
// @route GET /api/v1/brands/:id
// @access Public
exports.getBrand = factory.getOne(Brand);

// @desc  Create brand
// @route POST /api/v1/brands
// @access Private
exports.createBrand = factory.createOne(Brand);

// @desc  Update specific category
// @route PUT /api/categories/:id
// @acess Private
exports.updateBrand = factory.updateOne(Brand);

// @desc  Delete specific category
// @route Delete /api/categories/:id
// @acess Private
exports.deleteBrand = factory.deleteOne(Brand);