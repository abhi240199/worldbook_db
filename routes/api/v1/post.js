const express = require("express");
const passport = require("passport");
const postApi = require("../../../controllers/api/v1/post_api");
const router = express.Router();
router.get("/", postApi.index);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postApi.deletePost
);

module.exports = router;
