const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
});

const galleryItemSchema = new mongoose.Schema({
  src: {
    type: String,
    required: true,
    trim: true,
  },
  alt: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  hint: {
    type: String,
    required: false,
    trim: true,
    default: "",
  },
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    id: {
      type: String,
      trim: true,
      minlength: 3,
    },
    tagline: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,
    },
    heroImageBase64: {
      type: String,
      required: true,
      trim: true,
    },
    features: [featureSchema],
    gallery: [galleryItemSchema],
    published: {
      type: Boolean,
      default: true,
    },
    videoUrl: {
      type: String,
      trim: true,
      default: "",
    },
    videoThumbnail: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.models.Product || mongoose.model("Product", productSchema);
module.exports = ProductModel;