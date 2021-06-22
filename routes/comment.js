const express = require("express");
const passport = require("../config/passport-local-strategy");
const commentController = require("../controllers/comment_controller");
const router = express.Router();

router.post(
  "/create-comment",
  passport.checkAuthentication,
  commentController.createComment
);
router.get(
  "/delete-comment/:id",
  passport.checkAuthentication,
  commentController.deleteComment
);
module.exports = router;
