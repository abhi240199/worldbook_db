//render the sign up page
const { render } = require("ejs");
const User = require("../models/user");
module.exports.profile = function (req, res) {
  return res.render("profile");
};

//render the sign in page
module.exports.signIn = function (req, res) {
  return res.render("sign_in");
};
//render the sign up page
module.exports.signUp = function (req, res) {
  return res.render("sign_up");
};
//Creating  Sign up User

module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding the user signing up");
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("Error in  creating user");
          return;
        }
        console.log("New User Created:", user);
        return res.redirect("/user/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};
//Creating a seesion for Sign in User
module.exports.createSession = function (req, res) {};
