const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.createComment = async function (req, res) {
  try {
    const post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        user: req.user._id,
        post: req.body.post,
      });

      post.comments.push(comment);
      post.save();

      req.flash("success", "Comment has been created.");
      return res.redirect("/");
    }
  } catch (err) {
    req.flash("error", "You cannot comment.");
    return res.redirect("/");
  }
};
module.exports.deleteComment = function (req, res) {
  Comment.findById(req.params.id, function (err, comment) {
    if (err) {
      console.log("Error in finding a Comment");
      return;
    }
    if (comment.user == req.user.id) {
      let postId = comment.post;
      comment.remove();
      req.flash("success", "Comment deleted....");
      Post.findByIdAndUpdate(
        postId,
        { $pull: { comments: req.params.id } },
        function (err, post) {
          return res.redirect("back");
        }
      );
    } else {
      return res.redirect("back");
    }
  });
};
