const express = require("express");
const passport = require("passport");
const router = express.Router();
const userController = require("../controllers/user_controller");

router.get(
  "/profile/:id",
  passport.checkAuthentication,
  userController.profile
);
router.get("/sign-in", userController.signIn);
router.get("/sign-up", userController.signUp);
router.get("/sign-out", userController.signOut);

router.post("/create", userController.create);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/user/sign-in" }),
  userController.createSession
);
router.post("/update-profile/:id", userController.updateProfile);

module.exports = router;
