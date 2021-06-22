const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.createPost = function (req, res) {
  Post.create(
    {
      content: req.body.content,
      user: req.user._id,
    },
    function (err, post) {
      if (err) {
        req.flash("error", "Error in creating Post");
        return res.redirect("/");
      }
      if (post) {
        req.flash("success", "Congrats!Post Published..");
        return res.redirect("/");
      }
    }
  );
};
module.exports.deletePost = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {
      post.remove();

      await Comment.deleteMany({ post: req.params.id });
      req.flash("success", "Post deleted....");
      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", "Post can not be deleted");
    return res.redirect("back");
  }
};
