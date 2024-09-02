const express = require("express");
const router = express.Router();
const user = require("../controllers/users");

router.post("/register", user.registerUser);

router.post("/login", user.loginUser);

router.get("/:id/progress", user.userProgress);

router.post("/:id/startTopic", user.startTopic);

router.post("/:id/enroll", user.enrollUser);

module.exports = router;
