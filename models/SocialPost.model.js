const mongoose = require("mongoose");

const socialPostSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: [10, "Content must be at least 10 characters."],
      maxlength: [280, "Content cannot exceed 280 characters."],
    },
    image: {
      type: String,
      trim: true,
      default: null,
    },
    timestamp: {
      type: Date,
      required: true,
      default: Date.now,
    },
    likes: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    comments: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    hint: {
      type: String,
      trim: true,
      default: "social media",
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const SocialPostModel =
  mongoose.models.SocialPost || mongoose.model("SocialPost", socialPostSchema);
module.exports = SocialPostModel;
