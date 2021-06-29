const Comment = require("../models/comment");
const Post = require("../models/post");
const commentMailer = require("../mailers/comment-mailer");
const queue = require("../config/kue");
const commentEmailWorker = require("../workers/comment_email_worker");
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

      comment = await comment.populate("user", "name email").execPopulate();
      let job = queue.create("emails", comment).save(function (err) {
        if (err) {
          console.log("Error in sending to the queue:", err);
          return;
        }
        console.log("Job enqueued", job.id);
      });

      // commentMailer.newComment(comment);

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
