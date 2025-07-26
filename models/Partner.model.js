
const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    logo: {
      type: String,
      default: "https://placehold.co/200x200.png",
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const PartnerModel =
  mongoose.models.Partner || mongoose.model("Partner", partnerSchema);
module.exports = PartnerModel;
