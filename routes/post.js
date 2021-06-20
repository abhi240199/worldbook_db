const express = require("express");
const passport = require("../config/passport-local-strategy");
const postController = require("../controllers/post_controller");
const router = express.Router();
router.post("/create-post", postController.createPost);
module.exports = router;
