const {
  generateResponse,
  generateChatTitle,
} = require("../services/ai.service.js");
const Chat = require("../models/chat.model.js");
const Message = require("../models/message.model.js");

const chatController = async (req, res) => {
  try {
    const { message: userInput, chat: existingChatId } = req.body;

    if (!userInput) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    let newChat;
    if (!existingChatId) {
      // Create the chat
      const chatTitle = await generateChatTitle(userInput);
      newChat = await Chat.create({
        user: req.user.id,
        title: chatTitle,
      });
    }

    const chatId = existingChatId || newChat._id;

    // Create the user message
    const userMessage = await Message.create({
      chat: chatId,
      content: userInput,
      role: "user",
    });

    const previousMessages = await Message.find({
      chat: chatId,
    });

    // Get AI response
    const aiResponse = await generateResponse(previousMessages);
    const aiMessage = await Message.create({
      chat: chatId,
      content: aiResponse,
      role: "ai",
    });

    return res.status(201).json({
      chat: newChat,
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

const getChatsController = async (req, res) => {
  try {
    const userId = req.user.id;
    const chats = await Chat.find({ user: userId });
    res.status(200).json({
      message: "Chats fetched successfully",
      chats,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getMessagesController = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findOne({ _id: chatId, user: req.user.id });
    if (!chat) {
      return res.status(404).json({
        message: "Chat not found",
      });
    }

    const messages = await Message.find({ chat: chatId })

    res.status(200).json({
      message: "Messages fetched successfully",
      messages,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const deleteChatController = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findOneAndDelete({ _id: chatId, user: req.user.id });
    if (!chat) {
      return res.status(404).json({
        message: "Chat not found",
      });
    }
    await Message.deleteMany({ chat: chatId });

    res.status(200).json({
      message: "Chat deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

module.exports = {
  chatController,
  getChatsController,
  getMessagesController,
  deleteChatController,
};
