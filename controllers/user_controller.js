//render the sign up page
const { render } = require("ejs");
const User = require("../models/user");
module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    return res.render("profile", {
      title: "Worldbook|Profile",
      main_user: user,
    });
  });
};

module.exports.updateProfile = function (req, res) {
  if (req.user.id == req.params.id) {
    User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
      return res.redirect("back");
    });
  } else {
    return res.status(401).send("Unauthorized");
  }
};

//render the sign in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }
  return res.render("sign_in", {
    title: "Worldbook|Sign In",
  });
};

//render the sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }
  return res.render("sign_up", {
    title: "Worldbook|Sign Up",
  });
};

//Sign Out user
module.exports.signOut = function (req, res) {
  req.logout();
  return res.render("sign_in", {
    title: "Worldbook|Sign In",
  });
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
module.exports.createSession = function (req, res) {
  return res.redirect("/");
};
