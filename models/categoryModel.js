const mongoose = require("mongoose");

// 1- Create Schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        requires: [true, "Category required"],
        unique: [true, "Category must be unique"],
        minlength: [3, "Too short Category name"],
        maxlength: [32, "Too long Category name"],
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
        const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
        doc.image = imageUrl;
    }
};
categorySchema.post("init", (doc) => {
    setImageURL(doc);
});
categorySchema.post("save", (doc) => {
    setImageURL(doc);
});

// 2- Create Model
const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;