const express = require("express");
const userApi = require("../../../controllers/api/v1/user_api");
const router = express.Router();
router.post("/create-session", userApi.createSession);

module.exports = router;
