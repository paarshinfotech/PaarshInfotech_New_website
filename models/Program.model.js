
const mongoose = require("mongoose");

const programSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: 3,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: 10,
    },
    tags: {
      type: [String],
      required: [true, "At least one tag is required"],
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one tag is required.",
      },
    },
    icon: {
      type: String,
      default: "LuBookOpen",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const ProgramModel =
  mongoose.models.Program || mongoose.model("Program", programSchema);
module.exports = ProgramModel;
