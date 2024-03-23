const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "name required"],
    },
    slug: {
        type: String,
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, "email required"],
        unique: true,
        lowercase: true,
    },
    phone: String,
    profileImg: String,
    password: {
        type: String,
        required: [true, "password required"],
        minlength: [6, "Too short password"],
    },
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,

    role: {
        type: String,
        enum: ["user", "manager", "admin"],
        default: "user",
    },
    active: {
        type: Boolean,
        default: true,
    },
    // child reference (one to many)
    wishlist: [{
        type: mongoose.Schema.ObjectId,
        ref: "Product",
    }, ],
    // child reference (one to many)
    addresses: [{
        id: { type: mongoose.Schema.Types.ObjectId },
        alias: "String",
        details: "String",
        phone: String,
        city: String,
        postalCode: String,
    }, ],
}, {
    timestamps: true,
});

userSchema.pre("save", async function(next) {
    const user = this;
    if (!user.isModified("password")) return next();
    // Hashing User Password
    user.password = await bcrypt.hash(user.password, 12);
    next();
});

// userSchema.pre(/^find/, function(next) {
//     // this points to the current query
//     this.find({ active: { $ne: false } });
//     next();
// });

const User = mongoose.model("User", userSchema);
module.exports = User;