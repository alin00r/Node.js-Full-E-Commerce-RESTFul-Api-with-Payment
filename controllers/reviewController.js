const factory = require("./handlersFactory");
const Review = require("../models/reviewModel");

// @desc  Get list of reviews for specific product
// @route GET /api/v1/products/:productId/reviews
exports.createfilterObject = (req, res, next) => {
    let filterObject = {};
    if (req.params.productId) {
        filterObject = { product: req.params.productId };
    }
    if (req.params.reviewId) {
        filterObject = { review: req.params.reviewId };
    }
    req.filterObject = filterObject;
    next();
};

// @desc  Get list of Reviews
// @route GET /api/v1/reviews
// @access Public
exports.getReviews = factory.getAll(Review);

// @desc  Get specific Review by id
// @route GET /api/v1/reviews/:id
// @access Public
exports.getReview = factory.getOne(Review);

// Nested Route
exports.setProductIdAndUserIdToBody = (req, res, next) => {
    //Nested route (Create)
    if (!req.body.product) req.body.product = req.params.productId;
    if (!req.body.user) req.body.user = req.user._id;
    next();
};
// @desc  Create Review
// @route POST /api/v1/reviews
// @access Private/Protect/User
exports.createReview = factory.createOne(Review);

// @desc  Update specific Review
// @route PUT /api/reviwes/:id
// @access Private/Protect/User
exports.updateReview = factory.updateOne(Review);

// @desc  Delete specific Review
// @route Delete /api/reviwes/:id
// @access Private/Protect/User-Admin-Manager
exports.deleteReview = factory.deleteOne(Review);