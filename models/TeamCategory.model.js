const mongoose = require("mongoose");

const teamCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    allowMultiple: {
      type: Boolean,
      required: true,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const TeamCategoryModel =
  mongoose.models.TeamCategory ||
  mongoose.model("TeamCategory", teamCategorySchema);
module.exports = TeamCategoryModel;