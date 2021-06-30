const mongoose = require("mongoose");
const path = require("path");
const AVATAR_PATH = path.join("/uploads/posts/avatars");
var multer = require("multer");
const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      // required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", AVATAR_PATH));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

postSchema.statics.uploadedAvatar = multer({ storage: storage }).single(
  "avatar"
);
postSchema.statics.avatarPath = AVATAR_PATH;
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
