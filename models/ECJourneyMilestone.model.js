const mongoose = require("mongoose");

const ECJourneyMilestoneSchema = new mongoose.Schema(
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
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 500,
    },
    icon: {
      type: String,
      required: true,
      default: "LuFlag",
    },
    order: {
      type: Number,
      required: true,
      min: 1,
    }
  },
  { timestamps: true }
);

const ECJourneyMilestoneModel =
  mongoose.models.ECJourneyMilestone ||
  mongoose.model("ECJourneyMilestone", ECJourneyMilestoneSchema);

module.exports = ECJourneyMilestoneModel;
