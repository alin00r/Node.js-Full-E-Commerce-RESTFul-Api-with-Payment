const express = require("express");

const {
  createCashOrder,
  filterForLoggedUser,
  findSpecificOrder,
  findAllOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
  checkoutSession,
} = require("../controllers/orderController");

const authController = require("../controllers/authController");

const router = express.Router();
router.use(authController.Protect);

router.get(
  "/checkout-session/:cartId",
  authController.allowedTo("user"),
  checkoutSession
);
router
  .route("/:cartId")
  .post(authController.allowedTo("user"), createCashOrder);
router.get(
  "/",
  authController.allowedTo("admin", "manager", "user"),
  filterForLoggedUser,
  findAllOrders
);
router.get(
  "/:id",
  authController.allowedTo("admin", "manager", "user"),
  filterForLoggedUser,
  findSpecificOrder
);

router.put(
  "/:id/pay",
  authController.allowedTo("admin", "manager"),
  updateOrderToPaid
);
router.put(
  "/:id/deliver",
  authController.allowedTo("admin", "manager"),
  updateOrderToDelivered
);

module.exports = router;
