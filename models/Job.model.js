const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      validate: {
        validator: (value) => value.split(/\s+/).length <= 15,
        message: "Title cannot exceed 15 words.",
      },
    },
    location: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      validate: {
        validator: (value) => value.split(/\s+/).length <= 10,
        message: "Location cannot exceed 10 words.",
      },
    },
    type: {
      type: String,
      enum: ["Full-Time", "Internship"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Open", "Closed", "Scheduled"],
      required: true,
    },
    published: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      validate: {
        validator: (value) => value.split(/\s+/).length <= 100,
        message: "Description cannot exceed 100 words.",
      },
    },
    skills: {
      type: [String],
      required: true,
      validate: {
        validator: (array) => array.length > 0,
        message: "At least one skill is required.",
      },
    },
    publishDate: {
      type: Date,
      required: true,
    },
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Applicant",
      },
    ],
  },
  { timestamps: true }
);

jobSchema.pre("save", function (next) {
  if (this.publishDate > new Date() && this.status !== "Closed") {
    this.status = "Scheduled";
  } else if (this.status === "Scheduled" && this.publishDate <= new Date()) {
    this.status = "Open";
  }
  next();
});

const JobModel = mongoose.models.Job || mongoose.model("Job", jobSchema);
module.exports = JobModel;
