const express = require("express");
const {
    createUserValidator,
    changeUserPasswordValidator,
    updateUserValidator,
    deleteUserValidator,
    getUserValidator,
    updateLoggedUserValidator,
} = require("../utils/validators/userValidator");
const {
    getUser,
    getLoggedUserData,
    updateLoggedUserPassword,
    updateLoggedUserData,
    deleteLoggedUserData,
    getUsers,
    createUser,
    deleteUser,
    updateUser,
    uploadUserImage,
    resizeImage,
    changeUserPassword,
    activeLoggedUserData,
} = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.put("/activeMyAccount", activeLoggedUserData);
router.use(authController.Protect);

router.get("/getMe", getLoggedUserData, getUser);
router.put(
    "/changeMyPassword",

    updateLoggedUserPassword
);
router.put(
    "/updateMe",

    updateLoggedUserValidator,
    updateLoggedUserData
);

router.put(
    "/changePassword/:id",
    changeUserPasswordValidator,
    changeUserPassword
);
router.delete("/deleteMe", deleteLoggedUserData);

router
    .route("/")
    .get(authController.allowedTo("admin", "manager"), getUsers)
    .post(
        authController.allowedTo("admin"),
        uploadUserImage,
        resizeImage,
        createUserValidator,
        createUser
    );
router
    .route("/:id")
    .get(authController.allowedTo("admin"), getUserValidator, getUser)
    .put(
        authController.allowedTo("admin"),
        updateUserValidator,
        uploadUserImage,
        resizeImage,
        updateUser
    )
    .delete(authController.allowedTo("admin"), deleteUserValidator, deleteUser);

module.exports = router;