const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    designation: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      validate: {
        validator: Number.isInteger,
        message: "Rating must be a whole number between 1 and 5.",
      },
    },
    feedback: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 1000,
    },
    order: {
      type: Number,
      required: true,
      min: 1,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Ensure unique order numbers
testimonialSchema.index({ order: 1 }, { unique: true, sparse: true });

// Pre-save middleware to handle order conflicts
testimonialSchema.pre("save", async function (next) {
  if (this.isModified("order")) {
    try {
      const existing = await this.constructor.findOne({
        order: this.order,
        _id: { $ne: this._id },
      });
      if (existing) {
        await this.constructor.updateMany(
          { order: { $gte: this.order }, _id: { $ne: this._id } },
          { $inc: { order: 1 } }
        );
      }
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const TestimonialModel =
  mongoose.models.Testimonial ||
  mongoose.model("Testimonial", testimonialSchema);
module.exports = TestimonialModel;
