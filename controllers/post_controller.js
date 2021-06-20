const Post = require("../models/post");
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
        return res.redirect("/user/profile");
      }
    }
  );
};
