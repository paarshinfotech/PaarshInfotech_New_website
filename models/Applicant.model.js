const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Must be a valid email"],
    },
    resumeUrl: {
      type: String,
      required: true,
      default: "#",
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
  },
  { timestamps: true }
);

const ApplicantModel =
  mongoose.models.Applicant || mongoose.model("Applicant", applicantSchema);
module.exports = ApplicantModel;
