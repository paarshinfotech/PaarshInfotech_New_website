
const mongoose = require("mongoose");

const centerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Center name is required"],
      trim: true,
      minlength: 3,
    },
    partnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Partner",
      required: [true, "A partner college is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    headOfCenter: {
      type: String,
      trim: true,
    },
    contactEmail: {
      type: String,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Must be a valid email"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const CenterModel =
  mongoose.models.Center || mongoose.model("Center", centerSchema);
module.exports = CenterModel;
