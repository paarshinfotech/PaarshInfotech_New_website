const mongoose = require("mongoose");

const ECGalleryItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    hint: {
        type: String,
        default: "excellence center gallery"
    }
  },
  { timestamps: true }
);

const ECGalleryItemModel =
  mongoose.models.ECGalleryItem || mongoose.model("ECGalleryItem", ECGalleryItemSchema);
module.exports = ECGalleryItemModel;
