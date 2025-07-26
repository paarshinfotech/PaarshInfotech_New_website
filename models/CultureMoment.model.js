const mongoose = require("mongoose");

const cultureMomentSchema = new mongoose.Schema(
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
cultureMomentSchema.index({ order: 1 }, { unique: true, sparse: true });

// Pre-save middleware to handle order conflicts
cultureMomentSchema.pre("save", async function (next) {
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

const CultureMomentModel =
  mongoose.models.CultureMoment ||
  mongoose.model("CultureMoment", cultureMomentSchema);
module.exports = CultureMomentModel;
