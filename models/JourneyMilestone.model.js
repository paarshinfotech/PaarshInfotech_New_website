const mongoose = require("mongoose");

const journeyMilestoneSchema = new mongoose.Schema(
  {
    year: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (value) => /^\d{4}$/.test(value),
        message: "Year must be a 4-digit number.",
      },
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
      validate: {
        validator: (value) => value.split(/\s+/).length <= 10,
        message: "Title cannot exceed 10 words.",
      },
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 500,
      validate: {
        validator: (value) => value.split(/\s+/).length <= 100,
        message: "Description cannot exceed 100 words.",
      },
    },
    icon: {
      type: String,
      required: true,
      enum: [
        "LuFlag",
        "LuBriefcase",
        "LuBuilding2",
        "LuRocket",
        "LuGlobe",
        "LuStar",
        "LuTarget",
        "LuTrendingUp",
      ],
      default: "LuFlag",
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
journeyMilestoneSchema.index({ order: 1 }, { unique: true, sparse: true });

// Pre-save middleware to handle order conflicts
journeyMilestoneSchema.pre("save", async function (next) {
  if (this.isModified("order")) {
    try {
      // Check if another document has the same order
      const existing = await this.constructor.findOne({ 
        order: this.order, 
        _id: { $ne: this._id } 
      });
      
      if (existing) {
        // If there's a conflict, increment the order of existing documents
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

const JourneyMilestoneModel =
  mongoose.models.JourneyMilestone ||
  mongoose.model("JourneyMilestone", journeyMilestoneSchema);
module.exports = JourneyMilestoneModel;
