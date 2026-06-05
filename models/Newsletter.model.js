const mongoose = require("mongoose");

const newsletterSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address."],
        },
        subscribedAt: {
            type: Date,
            required: true,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const NewsletterModel =
    mongoose.models.Newsletter || mongoose.model("Newsletter", newsletterSchema);
module.exports = NewsletterModel;
