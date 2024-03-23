const slugify = require("slugify");
const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const User = require("../../models/userModel");

exports.signupValidator = [
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

    check("profileImg").optional(),
    check("role").optional(),
    validatorMiddleware,
];

exports.loginValidator = [
    check("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid email address"),
    check("password")
    .notEmpty()
    .withMessage("password required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
    validatorMiddleware,
];