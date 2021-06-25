const express = require("express");
const postApi = require("../../../controllers/api/v1/post_api");
const router = express.Router();
router.get("/", postApi.index);
router.delete("/:id", postApi.deletePost);

module.exports = router;
