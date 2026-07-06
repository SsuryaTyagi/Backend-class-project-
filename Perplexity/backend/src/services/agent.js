require("dotenv/config");
const { ChatMistralAI } = require("@langchain/mistralai");
const { createAgent } = require("langchain");
const { emailTool, searchTool } = require("./tools.js");

const model = new ChatMistralAI({
  model: "mistral-small-latest",
});

const agent = createAgent({
  model,
  tools: [emailTool, searchTool],
});

module.exports = { model, agent };