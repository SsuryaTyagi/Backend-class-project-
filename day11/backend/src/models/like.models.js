const mongoose = require("mongoose");
const { post } = require("../app");

const likeSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
      required: true,
    },
    user: {
      type: String,
      require: true,
    },
  },
  {
    timestampse: true,
  },
);

likeSchema.index({ post: 1, user: 1 }, { unique: true });


const likeModel = mongoose.model("like",likeSchema);

module.exports = likeModel;
