
const mongoose = require("mongoose");

// Base schema for common media properties
const baseMediaSchema = {
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
};

// Gallery Item Schema
const galleryItemSchema = new mongoose.Schema(
  {
    ...baseMediaSchema,
    category: {
      type: String,
      required: true,
      enum: undefined, // Explicitly remove enum validation
    },
  },
  { timestamps: true }
);

// Slider Image Schema
const sliderImageSchema = new mongoose.Schema(
  {
    ...baseMediaSchema,
    hint: String,
  },
  { timestamps: true }
);

// Behind The Scenes Schema
const btsItemSchema = new mongoose.Schema(
  {
    ...baseMediaSchema,
    hint: String,
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// Event Recap Schema
const eventRecapSchema = new mongoose.Schema(
  {
    ...baseMediaSchema,
    eventDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    images: [{
      imageUrl: { type: String, required: true },
      alt: { type: String, required: true },
      hint: { type: String }
    }],
  },
  { timestamps: true }
);

// Employee Spotlight Schema
const employeeSpotlightSchema = new mongoose.Schema(
  {
    ...baseMediaSchema,
    employeeName: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    quote: {
      type: String,
      required: true,
    },
    hint: String,
  },
  { timestamps: true }
);

// Create models
const GalleryItem = mongoose.models.GalleryItem || mongoose.model("GalleryItem", galleryItemSchema);
const SliderImage = mongoose.models.SliderImage || mongoose.model("SliderImage", sliderImageSchema);
const BtsItem = mongoose.models.BtsItem || mongoose.model("BtsItem", btsItemSchema);
const EventRecap = mongoose.models.EventRecap || mongoose.model("EventRecap", eventRecapSchema);
const EmployeeSpotlight = mongoose.models.EmployeeSpotlight || mongoose.model("EmployeeSpotlight", employeeSpotlightSchema);

module.exports = {
  GalleryItem,
  SliderImage,
  BtsItem,
  EventRecap,
  EmployeeSpotlight,
};
