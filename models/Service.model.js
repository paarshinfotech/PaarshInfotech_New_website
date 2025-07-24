const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
    },
    overview: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,
    },
    heroImage: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^(https?:\/\/[^\s$.?#].[^\s]*)$/.test(v);
        },
        message: "Must be a valid URL.",
      },
    },
    offerings: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
          minlength: 1,
        },
        description: {
          type: String,
          required: true,
          trim: true,
          minlength: 1,
        },
      },
    ],
    techStack: {
      frontend: {
        type: String,
        required: true,
        trim: true,
      },
      backend: {
        type: String,
        required: true,
        trim: true,
      },
      database: {
        type: String,
        required: true,
        trim: true,
      },
      tools: {
        type: String,
        required: true,
        trim: true,
      },
    },
    testimonial: {
      quote: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
      },
      name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
      },
      role: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
      },
      avatar: {
        type: String,
        required: true,
        trim: true,
        validate: {
          validator: function (v) {
            return /^(https?:\/\/[^\s$.?#].[^\s]*)$/.test(v);
          },
          message: "Must be a valid URL.",
        },
      },
    },
    gallery: [
      {
        src: {
          type: String,
          required: true,
          trim: true,
          validate: {
            validator: function (v) {
              return /^(https?:\/\/[^\s$.?#].[^\s]*)$/.test(v);
            },
            message: "Must be a valid URL.",
          },
        },
        alt: {
          type: String,
          required: true,
          trim: true,
          minlength: 1,
        },
        dataAiHint: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    industries: {
      type: String,
      required: true,
      trim: true,
    },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ServiceModel =
  mongoose.models.Service || mongoose.model("Service", serviceSchema);
module.exports = ServiceModel;
