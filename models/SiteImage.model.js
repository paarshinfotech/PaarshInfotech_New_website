const mongoose = require("mongoose");

const SiteImageSchema = new mongoose.Schema(
  {
    page: {
      type: String,
      required: true,
      trim: true,
    },
    section: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Each section identifier must be unique
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
      default: "website image",
    }
  },
  { timestamps: true }
);

const SiteImageModel =
  mongoose.models.SiteImage || mongoose.model("SiteImage", SiteImageSchema);

module.exports = SiteImageModel;
