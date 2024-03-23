const express = require("express");
const {
    getReviewValidator,
    createReviewValidator,
    updateReviewValidator,
    deleteReviewValidator,
} = require("../utils/validators/reviewValidator");
const {
    getReview,
    getReviews,
    createReview,
    updateReview,
    deleteReview,
    createfilterObject,
    setProductIdAndUserIdToBody,
} = require("../controllers/reviewController");

const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router
    .route("/")
    .get(createfilterObject, getReviews)
    .post(
        authController.Protect,
        authController.allowedTo("user"),
        setProductIdAndUserIdToBody,
        createReviewValidator,
        createReview
    );
router
    .route("/:id")
    .get(createfilterObject, getReviewValidator, getReview)
    .put(
        authController.Protect,
        authController.allowedTo("user"),
        updateReviewValidator,
        updateReview
    )
    .delete(
        authController.Protect,
        authController.allowedTo("admin", "user", "manager"),
        deleteReviewValidator,
        deleteReview
    );

module.exports = router;