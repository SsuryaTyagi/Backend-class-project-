const { generateResponse } = require("../services/ai.service.js");

const chatController = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    const response = await generateResponse(message);
    return res.status(200).json({
      aimessage: response,
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
