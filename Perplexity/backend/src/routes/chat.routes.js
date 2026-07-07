const express = require("express");
const { chatController, getChatsController,getMessagesController, deleteChatController } = require("../controllers/chat.controllers.js");
const authUser = require("../Middlewares/auth.middleware");

const router = express.Router();

router.post("/messages", authUser, chatController);
router.get("/chats", authUser, getChatsController);
router.get("/messages/:chatId", authUser, getMessagesController);
router.delete("/delete/:chatId", authUser, deleteChatController);

module.exports = router;
