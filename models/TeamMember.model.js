const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    avatar: {
      type: String,
      default: "https://placehold.co/40x40.png",
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TeamCategory",
      required: true,
    },
    published: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const TeamMemberModel =
  mongoose.models.TeamMember || mongoose.model("TeamMember", teamMemberSchema);
module.exports = TeamMemberModel;