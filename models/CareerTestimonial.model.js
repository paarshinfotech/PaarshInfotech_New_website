const mongoose = require("mongoose");

const careerTestimonialSchema = new mongoose.Schema(
  {
    quote: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      required: true,
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

careerTestimonialSchema.index({ order: 1 });

const CareerTestimonialModel =
  mongoose.models.CareerTestimonial ||
  mongoose.model("CareerTestimonial", careerTestimonialSchema);

module.exports = CareerTestimonialModel;
