const { tool } = require("langchain");
const z = require("zod");
const { sendVerificationEmail } = require("./email.service.js");
const { searchWeb } = require("./search.service.js");

const emailTool = tool(sendVerificationEmail, {
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
  description:
    "Use this tool to search the internet for current or factual information",
  schema: z.object({
    query: z.string().describe("The search query"),
  }),
});

module.exports = { emailTool, searchTool };