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
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^\d{10}$/, "Phone must be exactly 10 digits with no spaces"],
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

// Force schema reload in Next.js development environment
delete mongoose.models.Applicant;
const ApplicantModel = mongoose.model("Applicant", applicantSchema);
module.exports = ApplicantModel;
