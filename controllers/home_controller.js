const Post = require("../models/post");
const User = require("../models/user");
module.exports.home = function (req, res) {
  // console.log(req.cookies);
  User.find({}, function (err, users) {
    Post.find({})
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      })
      .exec(function (err, posts) {
        return res.render("home", {
          title: "Worldbook|Home",
          postList: posts,
          userList: users,
        });
      });
  });
};
