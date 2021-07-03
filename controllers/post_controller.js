const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");
module.exports.createPost = async function (req, res) {
  try {
    let post = await Post.create({
      user: req.user._id,
    });

    if (post) {
      Post.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("Multer Error in creating Post", err);
        }
        if (req.body.content) {
          post.content = req.body.content;
        }
        if (req.file) {
          post.avatar = Post.avatarPath + "/" + req.file.filename;
        }
        post.save();
      });
      let user = await User.findById(req.user._id);

      user.user_posts.push(post);
      user.save();
      req.flash("success", "Congrats!Post Published..");
      return res.redirect("back");
    }
  } catch (error) {
    req.flash("error", "Error in creating Post");
    console.log(error);
    return res.redirect("/");
  }
};
module.exports.deletePost = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {
      User.findByIdAndUpdate(
        post.user,
        { $pull: { user_posts: req.params.id } },
        function (err, post) {
          return res.redirect("back");
        }
      );
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
