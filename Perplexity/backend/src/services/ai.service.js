require("dotenv/config");
const { ChatMistralAI } = require("@langchain/mistralai");
const { HumanMessage, AIMessage } = require("@langchain/core/messages");
const { model, agent } = require("./agent.js");


const generateResponse = async (messages) => {
  const result = await agent.invoke({
    messages: messages.map((msg) =>{
        if (msg.role === "user") {
            return new HumanMessage(msg.content);
        }else if (msg.role === "ai") {
            return new AIMessage(msg.content);
        }
    }),
  });
  const lastMessage = result.messages[result.messages.length - 1];
  return lastMessage.content;
};

const generateChatTitle = async (userInput) => {
  const prompt = `
You are naming a chat conversation.
Generate a short, clear title (max 5-6 words) that summarizes the topic below.
Do NOT use quotes, punctuation at the end, or the words "title:".
Just return the plain title text.

User: ${userInput}
`.trim();

  const result = await model.invoke([new HumanMessage(prompt)]);
  return result.content.trim();
};

module.exports = { generateResponse, generateChatTitle };