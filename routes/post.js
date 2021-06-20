const express = require("express");
const router = express.Router();
router.post("/create-post", function (req, res) {
  console.log("Post Created");
  return res.redirect("/");
});
module.exports = router;
