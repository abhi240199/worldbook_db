const Post = require("../models/post");
const User = require("../models/user");
// module.exports.home = function (req, res) {
//   // console.log(req.cookies);

//   Post.find({})
//     .populate("user")
//     .populate({
//       path: "comments",
//       populate: {
//         path: "user",
//       },
//     })
//     .exec(function (err, posts) {
//       User.find({}, function (err, users) {
//         return res.render("home", {
//           title: "Worldbook|Home",
//           postList: posts,
//           userList: users,
//         });
//       });
//     });
// };
module.exports.home = async function (req, res) {
  try {
    const posts = await Post.find({})
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });

    const users = await User.find({});

    return res.render("home", {
      title: "Worldbook|Home",
      postList: posts,
      userList: users,
    });
  } catch (err) {
    console.log("Error", err);
    return;
  }
};
