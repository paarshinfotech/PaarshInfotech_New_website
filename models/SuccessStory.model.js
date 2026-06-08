const mongoose = require("mongoose");

const successStorySchema = new mongoose.Schema(
  {
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
    quote: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      default: "https://placehold.co/100x100.png",
    },
    published: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const SuccessStoryModel =
  mongoose.models.SuccessStory ||
  mongoose.model("SuccessStory", successStorySchema);
module.exports = SuccessStoryModel;
