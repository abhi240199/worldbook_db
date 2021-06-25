const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

module.exports.index = async function (req, res) {
  const posts = await Post.find({})
    .sort("-createdAt")
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });
  return res.json(200, {
    message: "List of post",
    post: posts,
  });
};
module.exports.deletePost = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {
      post.remove();

      await Comment.deleteMany({ post: req.params.id });
      return res.json(200, {
        message: "Post and Associated Comment deleted Successfully",
      });
    } else {
      return res.json(401, {
        message: "You cannot delete this post",
      });
    }
  } catch (err) {
    return res.json(500, {
      message: "Internal Server Error Solve it first",
    });
  }
};
