const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema(
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
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: [10, "Message must be at least 10 characters."],
    },
    services: {
        type: [String],
        required: true,
        validate: {
            validator: (arr) => arr.length > 0,
            message: "At least one service must be selected."
        }
    },
  },
  { timestamps: true }
);

const QuoteModel =
  mongoose.models.Quote || mongoose.model("Quote", quoteSchema);
module.exports = QuoteModel;
