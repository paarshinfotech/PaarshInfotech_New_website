const mongoose = require("mongoose");

const careerImageSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    alt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    hint: {
      type: String,
      trim: true,
    },
    order: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: true }
);

careerImageSchema.index({ order: 1 });

const CareerImageModel =
  mongoose.models.CareerImage ||
  mongoose.model("CareerImage", careerImageSchema);

module.exports = CareerImageModel;
