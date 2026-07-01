import "dotenv/config";
import readlineSync from "readline-sync";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage } from "@langchain/core/messages";
import { sendEmail } from "./email.service.js";
import { tool, createAgent } from "langchain";
import { searchWeb } from "./search.service.js";
import * as z from "zod";



const model = new ChatMistralAI({
  model: "mistral-small-latest",
});


const emailTool = tool(sendEmail, {
  name: "email_tool",
  description: "Use this tool to send an email",
  schema: z.object({
    to: z.string().describe("The recipient's email address"),
    html: z.string().describe("The html content of the email"),
    subject: z.string().describe("The subject of the email"),
  }),
});
const searchTool = tool(searchWeb, {
  name: "search_tool",
  description: "Use this tool to search the internet for current or factual information",
  schema: z.object({
    query: z.string().describe("The search query"),
  }),
});

const agent = createAgent({
  model,
  tools: [emailTool, searchTool],
});

const messages = [];

while (true) {
  const userInput = readlineSync.question("you: ");
  messages.push(new HumanMessage(userInput));

  const result = await agent.invoke({ messages });
  const response = result.messages[result.messages.length - 1];

  messages.push(response);
  console.log("AI: " + response.content);
}

readlineSync.close();
