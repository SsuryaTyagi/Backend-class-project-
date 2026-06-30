import "dotenv/config";
import readlineSync from "readline-sync";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage } from "@langchain/core/messages";
import { sendEmail } from "./email.service.js";
import { tool, createAgent } from "langchain";
import * as z from "zod";

const emailTool = tool(sendEmail, {
  name: "email_tool",
  description: "Use this tool to send an email",
  schema: z.object({
    to: z.string().describe("The recipient's email address"),
    html: z.string().describe("The html content of the email"),
    subject: z.string().describe("The subject of the email"),
  }),
});

const model = new ChatMistralAI({
  model: "mistral-small-latest",
});


const agent = createAgent({
  model,
  tools: [emailTool],
});


const messages = [];

while (true) {
  const userInput = await readlineSync.question("you: ");
  messages.push(new HumanMessage(userInput));

  const response = await agent.invoke({messages});
  // messages.push(response);

  console.log("AI: " + response);
}

readlineSync.close();
