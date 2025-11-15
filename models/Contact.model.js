const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "Name must be at least 2 characters."],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address."],
    },
    phone: {
      type: String,
      trim: true,
      required: false,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: [10, "Message must be at least 10 characters."],
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["New", "Read", "Archived"],
      required: true,
      default: "New",
    },
  },
  { timestamps: true }
);

const ContactModel =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);
module.exports = ContactModel;
