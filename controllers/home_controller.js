const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async function (req, res) {
  try {
    const posts = await Post.find({})
      .sort("-createdAt")
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });

    // const users = await User.find({});

    return res.render("home", {
      title: "Worldbook|Home",
      postList: posts,
    });
  } catch (err) {
    console.log("Error", err);
    return;
  }
};
