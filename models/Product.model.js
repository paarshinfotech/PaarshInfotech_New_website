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
    validate: {
      validator: function (v) {
        return /^(https?:\/\/[^\s$.?#].[^\s]*)$/.test(v);
      },
      message: "Must be a valid URL.",
    },
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
      required: true,
      trim: true,
      minlength: 3,
      validate: {
        validator: function (v) {
          return !v.includes(" ");
        },
        message: "Slug cannot contain spaces.",
      },
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
    heroImage: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^(https?:\/\/[^\s$.?#].[^\s]*)$/.test(v);
        },
        message: "Must be a valid URL.",
      },
    },
    features: [featureSchema],
    gallery: [galleryItemSchema],
    published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.models.Product || mongoose.model("Product", productSchema);
module.exports = ProductModel;