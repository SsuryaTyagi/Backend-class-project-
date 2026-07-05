const express = require("express");
const { chatController } = require("../controllers/chat.controllers.js");
const authUser = require("../Middlewares/auth.middleware");

const router = express.Router();

router.post("/messages", authUser, chatController);

module.exports = router;
