const express = require("express");
const homeController = require("../controllers/home_controller");
const router = express.Router();
router.get("/", homeController.home);
router.use("/user", require("./user"));
router.use("/post", require("./post"));
router.use("/friend", require("./friend"));
router.use("/api", require("./api"));

router.use("/comment", require("./comment"));

module.exports = router;
