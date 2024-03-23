const express = require("express");
const {
    getCoupon,
    createCoupon,
    getCoupons,
    updateCoupon,
    deleteCoupon,
} = require("../controllers/couponController");

const authController = require("../controllers/authController");

const router = express.Router();
router.use(
    authController.Protect,
    authController.allowedTo("admin", "manager")
);
router.route("/").get(getCoupons).post(createCoupon);
router.route("/:id").get(getCoupon).put(updateCoupon).delete(deleteCoupon);

module.exports = router;