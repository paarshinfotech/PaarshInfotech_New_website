const mongoose = require("mongoose");

const workshopSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    presenter: {
      type: String,
      required: [true, "Presenter is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    topics: {
      type: [String],
      default: [],
    },
    status: {
        type: String,
        enum: ["Upcoming", "Completed", "Cancelled"],
        default: "Upcoming"
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const WorkshopModel =
  mongoose.models.Workshop || mongoose.model("Workshop", workshopSchema);
module.exports = WorkshopModel;
