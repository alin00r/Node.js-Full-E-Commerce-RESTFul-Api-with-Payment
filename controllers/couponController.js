const Coupon = require("../models/couponModel");
const factory = require("./handlersFactory");

// @desc  Get list of Coupons
// @route GET /api/v1/coupons
// @access Private/Admin-Manager
exports.getCoupons = factory.getAll(Coupon);

// @desc  Get specific Coupon by id
// @route GET /api/v1/coupons/:id
// @access Private/Admin-Manager
exports.getCoupon = factory.getOne(Coupon);

// @desc  Create Coupon
// @route POST /api/v1/coupons
// @access Private/Admin-Manager
exports.createCoupon = factory.createOne(Coupon);

// @desc  Update specific Coupon
// @route PUT /api/coupons/:id
// @access Private/Admin-Manager
exports.updateCoupon = factory.updateOne(Coupon);

// @desc  Delete specific Coupon
// @route Delete /api/coupons/:id
// @access Private/Admin-Manager
exports.deleteCoupon = factory.deleteOne(Coupon);