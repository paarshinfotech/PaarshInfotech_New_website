import mongoose from 'mongoose';

const internshipTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const InternshipType = mongoose.models.InternshipType || mongoose.model('InternshipType', internshipTypeSchema);

export default InternshipType;
