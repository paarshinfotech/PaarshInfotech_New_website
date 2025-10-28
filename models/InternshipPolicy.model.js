import mongoose from 'mongoose';

const internshipPolicySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['terms', 'refund'],
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
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

const InternshipPolicy = mongoose.models.InternshipPolicy || mongoose.model('InternshipPolicy', internshipPolicySchema);

export default InternshipPolicy;
