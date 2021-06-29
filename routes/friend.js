const express = require("express");
const passport = require("../config/passport-local-strategy");
const friendController = require("../controllers/friend_controller");
const router = express.Router();
router.get("/", friendController.allUser);

module.exports = router;
