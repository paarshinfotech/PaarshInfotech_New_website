const mongoose = require("mongoose");

const awardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: 3,
    },
    year: {
      type: String,
      required: [true, "Year is required"],
      match: [/^\d{4}$/, "Must be a valid year"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: 10,
    },
    icon: {
      type: String,
      default: "LuAward",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const AwardModel =
  mongoose.models.Award || mongoose.model("Award", awardSchema);
module.exports = AwardModel;
