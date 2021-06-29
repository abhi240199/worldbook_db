const User = require("../models/user");
module.exports.allUser = async function (req, res) {
  const users = await User.find({});
  return res.render("friends", {
    title: "Worldbook|All UserList",
    userList: users,
  });
};
