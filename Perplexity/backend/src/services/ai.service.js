import "dotenv/config";
import readlineSync from "readline-sync";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage } from "@langchain/core/messages";
import { sendVerificationEmail } from "./email.service.js";
import { tool, createAgent } from "langchain";
// import { searchWeb } from "./search.service.js";
import * as z from "zod";

const model = new ChatMistralAI({
  model: "mistral-small-latest",
});

// const emailTool = tool(sendVerificationEmail, {
//   name: "email_tool",
//   description: "Use this tool to send an email",
//   schema: z.object({
//     to: z.string().describe("The recipient's email address"),
//     html: z.string().describe("The html content of the email"),
//     subject: z.string().describe("The subject of the email"),
//   }),
// });
// const searchTool = tool(searchWeb, {
//   name: "search_tool",
//   description:
//     "Use this tool to search the internet for current or factual information",
//   schema: z.object({
//     query: z.string().describe("The search query"),
//   }),
// });

// const agent = createAgent({
//   model,
//   tools: [emailTool],
// });

export const generateResponse = async (userInput) => {
  const result = await model.invoke([new HumanMessage(userInput)]);
  return result.content;
};
