const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Too short product title"],
        maxlength: [200, "Too long product title"],
    },
    slug: {
        type: String,
        rquired: true,
        lowecase: true,
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
        minlength: [20, "Too short description "],
    },
    quantity: {
        type: Number,
        required: [true, "Product Quantity is required"],
    },
    sold: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        rquired: [true, "Product price is required"],
        trim: true,
        max: [200000000, "Too long product price"],
    },
    priceAfterDiscound: {
        type: Number,
    },
    colors: [String],
    imageCover: {
        type: String,
        required: [true, "Product Image cover is required"],
    },
    images: [String],
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: [true, "Product must be belong with category"],
    },
    brand: {
        type: mongoose.Schema.ObjectId,
        ref: "Brand",
    },
    subcategories: [{
        type: mongoose.Schema.ObjectId,
        ref: "SubCategory",
    }, ],

    ratingsAverage: {
        type: Number,
        min: [1, "Rating must be above or equal 1.0"],
        max: [5, "Rating must be below or equal 5.0"],
    },
    ratingsQuantity: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
    // to enable virtual populate
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

// Virtual Populate
// بص يا سيدي دي بترجع ال ريفيوز ال يمعموله علي المنتج عن طريق ال parent refrence
productSchema.virtual("reviews", {
    ref: "Review",
    foreignField: "product",
    localField: "_id",
});
const setImageURL = (doc) => {
    // set image base url +image name
    if (doc.imageCover) {
        const imageUrl = `${process.env.Base_URL}/products/${doc.imageCover}`;
        doc.imageCover = imageUrl;
    }
    if (doc.images) {
        const imageList = [];
        doc.images.forEach((image) => {
            const imageUrl = `${process.env.Base_URL}/products/${image}`;
            imageList.push(imageUrl);
        });

        doc.images = imageList;
    }
};
productSchema.post("init", (doc) => {
    setImageURL(doc);
});
productSchema.post("save", (doc) => {
    setImageURL(doc);
});

// Mongoose query middleware
productSchema.pre(/^find/, function(next) {
    this.populate({ path: "category", select: "name -_id" });
    next();
});

module.exports = mongoose.model("Product", productSchema);