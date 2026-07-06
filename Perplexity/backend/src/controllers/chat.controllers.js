const {
  generateResponse,
  generateChatTitle,
} = require("../services/ai.service.js");
const Chat = require("../models/chat.model.js");
const Message = require("../models/message.model.js");

const chatController = async (req, res) => {
  try {
    const { message, chat: chatId } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Message is required",
      });
    }


    let chat;
    let chatTitle;
    if (!chatId) {
      // Create the chat
      chatTitle = await generateChatTitle(message);
      chat = await Chat.create({
        user: req.user.id,
        title: chatTitle,
      });
    }

    // Create the user message
    const userMessage =await Message.create({
        chat: chatId || chat._id,
        content: message,
        role: "user",
      });


      const messages = await Message.find({
        chat: chatId || chat._id,
      });

    // Get AI response and a short title for this chat, in parallel
    const aiResponse = await generateResponse(messages);
       const aiMessage = await Message.create({
        chat: chatId || chat._id,
        content: aiResponse,
        role: "ai",
      });

    return res.status(201).json({
      chat,
      userMessage,
      aiMessage,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = {
  chatController,
};
