const mongoose = require("mongoose");

const galleryCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const GalleryCategoryModel =
  mongoose.models.GalleryCategory ||
  mongoose.model("GalleryCategory", galleryCategorySchema);

module.exports = GalleryCategoryModel;