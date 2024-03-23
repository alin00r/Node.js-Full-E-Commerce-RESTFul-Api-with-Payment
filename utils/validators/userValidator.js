const slugify = require("slugify");
const { check } = require("express-validator");
const bcrypt = require("bcryptjs");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const User = require("../../models/userModel");

exports.getUserValidator = [
    check("id").isMongoId().withMessage("Invalid User id format"),
    validatorMiddleware,
];
exports.updateUserValidator = [
    check("id").isMongoId().withMessage("Invalid User id format"),
    check("name")
    .notEmpty()
    .withMessage("User name required")
    .isLength({ min: 2 })
    .withMessage("Too short User name")
    .isLength({ max: 32 })
    .withMessage("Too long User name")
    .custom((val, { req }) => {
        req.body.slug = slugify(val);
        return true;
    }),

    check("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom((val) =>
        User.findOne({ email: val }).then((user) => {
            if (user) {
                return Promise.reject(new Error("E-mail already in used"));
            }
        })
    ),

    check("password")
    .notEmpty()
    .withMessage("password required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .custom((password, { req }) => {
        if (password !== req.body.passwordConfirm) {
            throw new Error("Password Confirmation incorrect");
        }
        return true;
    }),

    check("passwordConfirm")
    .notEmpty()
    .withMessage("Password Confirmation required"),

    check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Invalid phone number only accepted EG-SA Phone numbers "),

    check("profileImg").optional(),
    check("role").optional(),
    validatorMiddleware,
];

exports.updateLoggedUserValidator = [
    check("name")
    .notEmpty()
    .withMessage("User name required")
    .isLength({ min: 2 })
    .withMessage("Too short User name")
    .isLength({ max: 32 })
    .withMessage("Too long User name")
    .custom((val, { req }) => {
        req.body.slug = slugify(val);
        return true;
    }),

    check("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom((val) =>
        User.findOne({ email: val }).then((user) => {
            if (user) {
                return Promise.reject(new Error("E-mail already in used"));
            }
        })
    ),

    check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Invalid phone number only accepted EG-SA Phone numbers "),

    validatorMiddleware,
];

exports.createUserValidator = [
    check("name")
    .notEmpty()
    .withMessage("User name required")
    .isLength({ min: 2 })
    .withMessage("Too short User name")
    .isLength({ max: 32 })
    .withMessage("Too long User name")
    .custom((val, { req }) => {
        req.body.slug = slugify(val);
        return true;
    }),

    check("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom((val) =>
        User.findOne({ email: val }).then((user) => {
            if (user) {
                return Promise.reject(new Error("E-mail already in used"));
            }
        })
    ),

    check("password")
    .notEmpty()
    .withMessage("password required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .custom((password, { req }) => {
        if (password !== req.body.passwordConfirm) {
            throw new Error("Password Confirmation incorrect");
        }
        return true;
    }),

    check("passwordConfirm")
    .notEmpty()
    .withMessage("Password Confirmation required"),

    check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Invalid phone number only accepted EG-SA Phone numbers "),

    check("profileImg").optional(),
    check("role").optional(),
    validatorMiddleware,
];
exports.changeUserPasswordValidator = [
    check("id").isMongoId().withMessage("Invalid User id format"),
    check("currentPassword")
    .notEmpty()
    .withMessage("you must enter your current password"),
    check("passwordConfirm")
    .notEmpty()
    .withMessage("You must enter the password confirm"),
    check("password")
    .notEmpty()
    .withMessage("You must enter the new password ")
    .custom(async(val, { req }) => {
        //1) verify current password
        const user = await User.findById(req.params.id);
        if (!user) {
            throw new Error("User not found 404!");
        }
        const checkPassword = await bcrypt.compare(
            req.body.currentPassword,
            user.password
        );
        if (!checkPassword) {
            throw new Error("Incorrect current password ");
        }
        //2) verify  password confirm
        if (val !== req.body.passwordConfirm) {
            throw new Error("Password Confirmation incorrect");
        }
        return true;
    }),
    validatorMiddleware,
];
exports.deleteUserValidator = [
    check("id").isMongoId().withMessage("Invalid User id format"),
    validatorMiddleware,
];