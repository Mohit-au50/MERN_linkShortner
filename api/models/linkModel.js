const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const LinkSchema = new Schema(
  {
    linkAlias: {
      type: String,
      required: true,
    },
    originalLink: {
      type: String,
      required: true,
    },
    shortenedLink: {
      type: String,
      required: true,
    },
    visitCount: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Link = model("Links", LinkSchema);
module.exports = Link;
