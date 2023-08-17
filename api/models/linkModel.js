const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const LinkSchema = new Schema(
  {
    linkAlias: {
      type: String,
    },
    originalLink: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// define pre-svae middleware if you wish to do something before the documnet is created
LinkSchema.pre("save", function (next) {
  if (!this.linkAlias) {
    this.linkAlias = this._id.toString().slice(-5);
  }
  next();
});

const Link = model("Links", LinkSchema);
module.exports = Link;
