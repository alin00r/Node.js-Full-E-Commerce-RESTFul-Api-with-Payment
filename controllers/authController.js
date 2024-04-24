const crypto = require('crypto');

const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const ApiError = require('../utils/apiError');
const sendEmail = require('../utils/sendEmail');
const createSendTokenCookies = require('../utils/createToken');

// @desc   Signup
// @route  POST /api/v1/auth/signup
// @access Plublic
exports.signup = asyncHandler(async (req, res, next) => {
  // 1) Create user
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  // 2) Generate token & Cookies
  createSendTokenCookies(user, 201, res);
});

// @desc   Login
// @route  POST /api/v1/auth/login
// @access Public
exports.login = asyncHandler(async (req, res, next) => {
  // 1) Check if password and email in the body (validation)
  //2) check if user exist & check if password is correct
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError('Incorrect email or password', 401));
  }
  //3) generate token
  createSendTokenCookies(user, 200, res);
});

// @desc   Protect => make user is logged in
exports.Protect = asyncHandler(async (req, res, next) => {
  // 1) check if token exist,if exist get
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
    // console.log(token);
  }
  if (!token) {
    return next(
      new ApiError(
        'You are not login, Please login to get access this route',
        401
      )
    );
  }
  // 2) verify token (no change happen or expired token)
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  // 3) Check if user exists
  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    return next(
      new ApiError(
        'The user that belong to this token does not longer exist',
        401
      )
    );
  }
  if (!currentUser.active === true) {
    return next(
      new ApiError('The user that belong to this token has been Deleted', 401)
    );
  }
  // 4) Check if user change his password after token created
  if (currentUser.passwordChangedAt) {
    const passChangedTimestamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );
    // Password changed after token Created
    if (passChangedTimestamp > decoded.iat) {
      return next(
        new ApiError(
          'User recently changed his password, please login again.. ',
          401
        )
      );
    }
  }
  req.user = currentUser;

  next();
});

// @desc Authorization (User Permissions)
// ["admin","manager"]
exports.allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    // 1) access roles
    //2) access registered user (req.user.role)

    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(' You are not authorized to access this route'),
        403
      );
    }
    next();
  });

// @desc   Forgot password
// @route  POST /api/v1/auth/forgorPassword
// @access Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  // 1) Get User by email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiError(`There is no user with that email  ${req.body.email}`),
      404
    );
  }
  // 2) If user exist ,Generate hash reset random 6 digits and save it in db
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedResetCode = crypto
    .createHash('sha256')
    .update(resetCode)
    .digest('hex');
  // Save hashed password reset code in database
  user.passwordResetCode = hashedResetCode;
  // Add expiration time for password reset code (10 min)
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  user.passwordResetVerified = false;

  user.save();
  const message = `Hi ${user.name},\n We received a request to reset the password on your E-shop Account. \n ${resetCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The E-shop Team`;

  // 3) Send the reset Code via email
  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset Code (valid for 10 Min)',
      message: message,
    });
  } catch (err) {
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;
    await user.save();
    return next(new ApiError(`There is an error in sending email`), 500);
  }

  res.status(200).json({
    status: 'Success',
    message: 'Reset Code sent to email',
  });
});

// @desc   verify password Reset Code
// @route  POST /api/v1/auth/verifyResetCode
// @access Public
exports.verifyPasswordResetCode = asyncHandler(async (req, res, next) => {
  //1) Get user based on reset code

  const hashedResetCode = crypto
    .createHash('sha256')
    .update(req.body.resetCode)
    .digest('hex');

  const user = await User.findOne({
    passwordResetCode: hashedResetCode,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ApiError('Reset Code invalid or expired'));
  }
  //2) Reset code valid
  user.passwordResetVerified = true;
  await user.save();

  res.status(200).json({
    status: 'Success',
  });
});

// @desc   Reset Password
// @route  /api/v1/auth/resetPassword
// @access Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiError(`There is no user with this ${req.body.email}`, 404)
    );
  }

  if (!user.passwordResetVerified) {
    return next(new ApiError(`Reset Code not verified`, 400));
  }

  user.password = req.body.newPassword;
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = undefined;

  await user.save();
  // Generate Token
  createSendTokenCookies(user, 200, res);
});

exports.logout = async (req, res, next) => {
  res
    .clearCookie('jwt')
    .status(200)
    .json({ status: 'success', message: 'Logout Successful' });
};
