const mongoose = require("mongoose");
const { Schema } = mongoose;

// Clear cached model to prevent schema conflicts
delete mongoose.models.Service;

const ServiceSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      minlength: [3, "Slug must be at least 3 characters"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters"],
      trim: true,
    },
    overview: {
      type: String,
      required: [true, "Overview is required"],
      minlength: [20, "Overview must be at least 20 characters"],
      trim: true,
    },
    heroImageBase64: {
      type: String,
      required: [true, "Hero image is required"],
      trim: true,
    },
    Icon: {
      type: String,
      default: null,
    },
    offerings: [
      {
        title: {
          type: String,
          required: [true, "Offering title is required"],
          trim: true,
          minlength: [1, "Offering title must be at least 1 character"],
        },
        description: {
          type: String,
          required: [true, "Offering description is required"],
          trim: true,
          minlength: [1, "Offering description must be at least 1 character"],
        },
        Icon: {
          type: String,
          default: null,
        },
      },
    ],
    whyChooseUs: [
      {
        title: {
          type: String,
          required: [true, "Why choose us title is required"],
          trim: true,
          minlength: [1, "Why choose us title must be at least 1 character"],
        },
        description: {
          type: String,
          required: [true, "Why choose us description is required"],
          trim: true,
          minlength: [1, "Why choose us description must be at least 1 character"],
        },
        Icon: {
          type: String,
          default: null,
        },
      },
    ],
    techStack: {
      frontend: {
        type: [String],
        required: [true, "At least one frontend technology is required"],
        validate: {
          validator: (arr) => Array.isArray(arr) && arr.every((item) => typeof item === "string" && item.trim().length > 0),
          message: "Frontend technologies must be non-empty strings",
        },
      },
      backend: {
        type: [String],
        required: [true, "At least one backend technology is required"],
        validate: {
          validator: (arr) => Array.isArray(arr) && arr.every((item) => typeof item === "string" && item.trim().length > 0),
          message: "Backend technologies must be non-empty strings",
        },
      },
      database: {
        type: [String],
        required: [true, "At least one database is required"],
        validate: {
          validator: (arr) => Array.isArray(arr) && arr.every((item) => typeof item === "string" && item.trim().length > 0),
          message: "Databases must be non-empty strings",
        },
      },
      tools: {
        type: [String],
        required: [true, "At least one tool is required"],
        validate: {
          validator: (arr) => Array.isArray(arr) && arr.every((item) => typeof item === "string" && item.trim().length > 0),
          message: "Tools must be non-empty strings",
        },
      },
    },
    process: [
      {
        title: {
          type: String,
          required: [true, "Process title is required"],
          trim: true,
          minlength: [1, "Process title must be at least 1 character"],
        },
        description: {
          type: String,
          required: [true, "Process description is required"],
          trim: true,
          minlength: [1, "Process description must be at least 1 character"],
        },
        Icon: {
          type: String,
          default: null,
        },
      },
    ],
    impact: [
      {
        title: {
          type: String,
          required: [true, "Impact title is required"],
          trim: true,
          minlength: [1, "Impact title must be at least 1 character"],
        },
        metric: {
          type: String,
          required: [true, "Impact metric is required"],
          trim: true,
          minlength: [1, "Impact metric must be at least 1 character"],
        },
        description: {
          type: String,
          required: [true, "Impact description is required"],
          trim: true,
          minlength: [1, "Impact description must be at least 1 character"],
        },
        Icon: {
          type: String,
          default: null,
        },
      },
    ],
    testimonial: {
      quote: {
        type: String,
        required: [true, "Testimonial quote is required"],
        trim: true,
        minlength: [10, "Testimonial quote must be at least 10 characters"],
      },
      name: {
        type: String,
        required: [true, "Testimonial name is required"],
        trim: true,
        minlength: [2, "Testimonial name must be at least 2 characters"],
      },
      role: {
        type: String,
        required: [true, "Testimonial role is required"],
        trim: true,
        minlength: [2, "Testimonial role must be at least 2 characters"],
      },
      avatarBase64: {
        type: String,
        required: [true, "Testimonial avatar is required"],
        trim: true,
        validate: {
          validator: (v) => /^data:image\/[a-zA-Z]+;base64,/.test(v),
          message: "Testimonial avatar must be a valid base64 image string",
        },
      },
    },
    gallery: [
      {
        srcBase64: {
          type: String,
          required: [true, "Gallery image source is required"],
          trim: true,
          validate: {
            validator: (v) => /^data:image\/[a-zA-Z]+;base64,/.test(v),
            message: "Gallery image source must be a valid base64 image string",
          },
        },
        alt: {
          type: String,
          required: [true, "Gallery image alt text is required"],
          trim: true,
          minlength: [1, "Gallery image alt text must be at least 1 character"],
        },
        dataAiHint: {
          type: String,
          required: [true, "Gallery image AI hint is required"],
          trim: true,
        },
      },
    ],
    industries: {
      type: [String],
      required: [true, "At least one industry is required"],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.every((item) => typeof item === "string" && item.trim().length > 0),
        message: "Industries must be non-empty strings",
      },
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Enhanced debugging for schema validation
ServiceSchema.pre("save", function (next) {
  console.log("Saving Service document:", {
    techStack: this.techStack,
    industries: this.industries,
    rawData: JSON.stringify(this.toObject(), null, 2),
  });
  next();
});

// Log schema definition for verification
console.log("Service schema defined with fields:", Object.keys(ServiceSchema.paths));

const ServiceModel = mongoose.model("Service", ServiceSchema);
module.exports = ServiceModel;