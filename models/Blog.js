const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const blogSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    body: {
      type: String,
      required: true,
      maxlength: 5000,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = Blog = mongoose.model("Blog", blogSchema);
