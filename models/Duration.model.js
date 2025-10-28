import mongoose from 'mongoose';

const durationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    durationInMonths: {
      type: Number,
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

const Duration = mongoose.models.Duration || mongoose.model('Duration', durationSchema);

export default Duration;
