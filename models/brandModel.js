const mongoose = require("mongoose");

// 1- Create Schema
const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        requires: [true, "brand required"],
        unique: [true, "brand must be unique"],
        minlength: [2, "Too short brand name"],
        maxlength: [32, "Too long brand name"],
    },
    slug: {
        type: String,
        lowercase: true,
    },
    image: String,
}, { timestamps: true });
const setImageURL = (doc) => {
    // set image base url +image name
    if (doc.image) {
        const imageUrl = `${process.env.Base_URL}/brands/${doc.image}`;
        doc.image = imageUrl;
    }
};
brandSchema.post("init", (doc) => {
    setImageURL(doc);
});
brandSchema.post("save", (doc) => {
    setImageURL(doc);
});

// 2- Create Model
module.exports = mongoose.model("Brand", brandSchema);