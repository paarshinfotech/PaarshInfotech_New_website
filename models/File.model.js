import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      default: 'other',
    },
    uploadedBy: {
      type: String,
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

// Clear cached model in development/reloads so schema changes take effect immediately
if (mongoose.models && mongoose.models.File) {
  delete mongoose.models.File;
}

const File = mongoose.models.File || mongoose.model('File', fileSchema);

export default File;
