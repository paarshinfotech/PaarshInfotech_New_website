const mongoose = require("mongoose");

const MediaHeroSchema = new mongoose.Schema(
  {
    page: {
      type: String,
      required: true,
      default: "media",
      unique: true, // Ensures only one document for the media page
    },
    alt: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    hint: {
      type: String,
      trim: true,
      default: "media page hero",
    }
  },
  { timestamps: true }
);

const MediaHeroModel =
  mongoose.models.MediaHero || mongoose.model("MediaHero", MediaHeroSchema);

module.exports = MediaHeroModel;
