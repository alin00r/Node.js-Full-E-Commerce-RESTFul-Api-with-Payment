const mongoose = require("mongoose");

// 1- Create Schema
const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      requires: [true, "Category required"],
      unique: [true, "Category must be unique"],
      minlength: [2, "Too short Category name"],
      maxlength: [32, "Too long Category name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "SubCategory must be belong to parent category"],
    },
  },
  { timestamps: true }
);

// 2- Create Model
module.exports = mongoose.model("SubCategory", subCategorySchema);
