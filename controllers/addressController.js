const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

// @desc  Add address to user addresses list
// @route POST /api/v1/addresses
// @access Private/Protected/User
exports.addaddress = asyncHandler(async(req, res, next) => {
    // $addToSet => add address object to user address array if  address not exist
    const user = await User.findByIdAndUpdate(
        req.user._id, {
            $addToSet: { addresses: req.body },
        }, { new: true }
    );
    res.status(200).json({
        status: "success",
        message: "Address added successfully.",
        data: user.addresses,
    });
});

// @desc  Remove addresses from user addresses list
// @route DELETE /api/v1/addresses/:AddressId
// @access Private/Protected/User
exports.removeaddress = asyncHandler(async(req, res, next) => {
    // $pull => Remove AddressId from user addresses list  if AddressId exist
    const user = await User.findByIdAndUpdate(
        req.user._id, {
            $pull: { addresses: { _id: req.params.addressId } },
        }, { new: true }
    );
    res.status(200).json({
        status: "success",
        message: "Address removed successfully.",
        data: user.addresses,
    });
});

// @desc   Get Logged User addresses
// @route  GET /api/v1/addresses
// @access Protected/User
exports.getLoggedUserAddresses = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.user._id);

    res.status(200).json({
        status: "success",
        results: user.addresses.length,
        data: user.addresses,
    });
});