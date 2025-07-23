const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    industry: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    since: {
      type: String,
      required: true,
      match: [/^\d{4}$/, "Must be a valid year"],
    },
    logo: {
      type: String,
      default: "https://placehold.co/40x40.png",
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const ClientModel =
  mongoose.models.Client || mongoose.model("Client", clientSchema);
module.exports = ClientModel;
