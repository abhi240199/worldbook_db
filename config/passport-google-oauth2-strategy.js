const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../models/user");
const crypto = require("crypto");
passport.use(
  new googleStrategy(
    {
      clientID:
        "66604720389-q6047uhp4io514o57jalvgfb6par2too.apps.googleusercontent.com",
      clientSecret: "xwqaiKef20D-0PxIPVmL3Ri1",
      callbackURL: "http://localhost:8000/user/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log("Error in google Strategy-passport", err);
          return;
        }
        console.log("Access Token:", accessToken);
        console.log("Refresh Token:", refreshToken);
        console.log("Profile:", profile);
        if (user) {
          return done(null, user);
        } else {
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log("Error in google Strategy-passport", err);
                return;
              }
              return done(null, user);
            }
          );
        }
      });
    }
  )
);
module.exports = passport;
