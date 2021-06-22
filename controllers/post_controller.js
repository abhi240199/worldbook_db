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
        console.log("Error in creating Post");
        return res.redirect("/");
      }
      if (post) {
        console.log("Post has been created", post);
        return res.redirect("/");
      }
    }
  );
};
module.exports.deletePost = function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    if (err) {
      console.log("Error in finding a Post");
      return;
    }
    if (post.user == req.user.id) {
      post.remove();
      Comment.deleteMany({ post: req.params.id }, function (err) {
        return res.redirect("back");
      });
    } else {
      return res.redirect("back");
    }
  });
};
