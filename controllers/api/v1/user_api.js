const User = require("../../../models/user");
const jwt = require("jsonwebtoken");

module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user || user.password != req.body.password) {
      return res.json(422, {
        message: "Invalid Username and Password",
      });
    }
    return res.json(200, {
      message: "Sign in Successfully!here is your token",
      data: {
        token: jwt.sign(user.toJSON(), "worldbook", { expiresIn: "10000000" }),
      },
    });
  } catch (err) {
    console.log("*****", err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
