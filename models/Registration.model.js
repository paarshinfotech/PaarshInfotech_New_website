import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College',
      required: true,
    },
    internshipType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'InternshipType',
      required: true,
    },
    attendanceMode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mode',
      required: true,
    },
    joiningDate: {
      type: Date,
      required: true,
    },
    internshipDuration: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Duration',
      required: true,
    },
    hasLaptop: {
      type: Boolean,
      required: true,
    },
    referralName: {
      type: String,
      trim: true,
    },
    internshipNote: {
      type: String,
      trim: true,
    },
    resumeUrl: {
      type: String,
      required: true,
    },
    paymentScreenshotUrl: {
      type: String,
      required: true,
    },
    registrationNumber: {
      type: String,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    offerLetterSent: {
      type: Boolean,
      default: false,
    },
    completionLetterSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Generate registration number before saving
registrationSchema.pre('save', async function (next) {
  if (!this.registrationNumber) {
    const date = new Date();
    const year = date.getFullYear();
    const count = await mongoose.models.Registration.countDocuments();
    this.registrationNumber = `PI-${year}-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

const Registration = mongoose.models.Registration || mongoose.model('Registration', registrationSchema);

export default Registration;
