const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const ApiError = require("../utils/apiError");
const factory = require("./handlersFactory");
const createToken = require("../utils/createToken");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");

// Upload Single Image
exports.uploadUserImage = uploadSingleImage("profileImg");
// Image Processing
exports.resizeImage = asyncHandler(async(req, res, next) => {
    const fileName = `user-${uuidv4()}-${Date.now()}.jpeg`;
    if (req.file) {
        await sharp(req.file.buffer)
            .resize(600, 600)
            .toFormat("jpeg")
            .jpeg({ quality: 95 })
            .toFile(`uploads/users/${fileName}`);
        req.body.image = fileName;
    }
    next();
});

// @desc  Get list of users
// @route GET /api/v1/users
// @access Private
exports.getUsers = factory.getAll(User);

// @desc  Get specific User by id
// @route GET /api/v1/users/:id
// @access Private
exports.getUser = factory.getOne(User);

// @desc  Create user
// @route POST /api/v1/users
// @access Private
exports.createUser = factory.createOne(User);

// @desc  Update specific User
// @route PUT /api/users/:id
// @acess Private
exports.updateUser = asyncHandler(async(req, res, next) => {
    const document = await User.findByIdAndUpdate(
        req.params.id, {
            name: req.body.name,
            slug: req.body.slug,
            phone: req.body.phone,
            email: req.body.email,
            profileImg: req.body.profileImg,
            role: req.body.role,
        }, {
            new: true,
        }
    );

    if (!document) {
        return next(new ApiError(`No document for this id ${req.params.id}`, 404));
    }
    res.status(200).json({ data: document });
});

exports.changeUserPassword = asyncHandler(async(req, res, next) => {
    const document = await User.findByIdAndUpdate(
        req.params.id, {
            password: await bcrypt.hash(req.body.password, 12),
            passwordChangedAt: Date.now(),
        }, {
            new: true,
        }
    );

    if (!document) {
        return next(new ApiError(`No document for this id ${req.params.id}`, 404));
    }
    res.status(200).json({ data: document });
});
// @desc  Delete specific User
// @route Delete /api/users/:id
// @acess Private/Protect
exports.deleteUser = factory.deleteOne(User);

// @desc  Get Logged User data
// @route GET /api/v1/users/getMe
// @access Private/Protect
exports.getLoggedUserData = asyncHandler(async(req, res, next) => {
    req.params.id = req.user._id;
    next();
});

// @desc  Update Logged User Password
// @route PUT /api/v1/users/changeMyPassword
// @access Private/Protect
exports.updateLoggedUserPassword = asyncHandler(async(req, res, next) => {
    const user = await User.findByIdAndUpdate(
        req.user._id, {
            password: await bcrypt.hash(req.body.password, 12),
            passwordChangedAt: Date.now(),
        }, { new: true }
    );
    // Generate Token
    const token = createToken(user._id);
    res.status(200).json({
        status: "Success",
        token,
    });
});

// @desc  Update Logged User data (without password,role)
// @route PUT /api/v1/users/updateMyData
// @access Private/Protect
exports.updateLoggedUserData = asyncHandler(async(req, res, next) => {
    const updatedUser = await User.findByIdAndUpdate(
        req.user._id, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
        }, { new: true }
    );
    // Generate Token
    res.status(200).json({
        status: "Success",
        data: updatedUser,
    });
});

// @desc  Deactivate Logged User
// @route DELETE /api/v1/users/deleteMe
// @access Private/Protect
exports.deleteLoggedUserData = asyncHandler(async(req, res, next) => {
    await User.findByIdAndUpdate(req.user._id, {
        active: false,
    });

    res.status(204).send();
});
// @desc  activate Logged User
// @route PUT /api/v1/users/activeMe
// @access Public
exports.activeLoggedUserData = asyncHandler(async(req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !user.active === false) {
        res.status(204).send();
    }
    // eslint-disable-next-line no-unused-expressions
    user.active = true;

    await user.save();

    res.status(200).json({
        status: "success",
        message: "Your Account activated successfuly",
    });
});