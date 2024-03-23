const express = require("express");
const {
    addaddress,
    removeaddress,
    getLoggedUserAddresses,
} = require("../controllers/addressController");

const authController = require("../controllers/authController");

const router = express.Router();
router.use(authController.Protect, authController.allowedTo("user"));

router.route("/").get(getLoggedUserAddresses).post(addaddress);

router.route("/:addressId").delete(removeaddress);

module.exports = router;