const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.createComment = function (req, res) {
  Post.findById(req.body.post, function (err, post) {
    if (post) {
      Comment.create(
        {
          content: req.body.content,
          user: req.user._id,
          post: req.body.post,
        },
        function (err, comment) {
          if (err) {
            console.log("Error in creating Comment");
            return res.redirect("/");
          }
          if (comment) {
            console.log("Comment has been created", comment);
            post.comments.push(comment);
            post.save();
            return res.redirect("/");
          }
        }
      );
    }
  });
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
