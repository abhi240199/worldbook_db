const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          req.flash("error", err);
          return done(err);
        }
        if (!user || user.password != password) {
          req.flash("error", "Invalid username/password");

          return done(null, false, { message: "Incorrect username/password." });
        }
        return done(null, user);
      });
    }
  )
);
//we are storing user id into a cookie as a key
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
//we are finding user id by the help of cookie

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding user via Passport");
      return done(err);
    }
    done(err, user);
  });
});

//checking authenticate user or not
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/user/sign-in");
};
///setting authentication session cookie

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }

  next();
};

module.exports = passport;
