import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { StateSchema, MessagesValue, ReducedValue, StateGraph, START, END } from "@langchain/langgraph";
import type { GraphNode } from "@langchain/langgraph";
import { mistralModel, cohereModel, geminiModel } from "./modules.service.js";
import { z } from "zod";

// Judge output schema
const JudgeSchema = z.object({
  winner: z.enum(["solution_1", "solution_2"]),
  solution_1_score: z.number().min(0).max(100),
  solution_2_score: z.number().min(0).max(100),
  reasoning: z.string(),
});

const State = new StateSchema({
  messages: MessagesValue,
  solution_1: new ReducedValue(z.string().default(""), {
    reducer: (current, next) => next,
  }),
  solution_2: new ReducedValue(z.string().default(""), {
    reducer: (current, next) => next,
  }),
  judge_recommendation: new ReducedValue(
    z.object({
      winner: z.string(),
      solution_1_score: z.number(),
      solution_2_score: z.number(),
      reasoning: z.string(),
    }).default({
      winner: "",
      solution_1_score: 0,
      solution_2_score: 0,
      reasoning: "",
    }),
    {
      reducer: (current, next) => next,
    }
  ),
});

// Solution Node: Generate answers from both models
const solutionNode: GraphNode<typeof State> = async (state) => {
  const [mistral_solution, cohere_solution] = await Promise.all([
    mistralModel.invoke(state.messages),
    cohereModel.invoke(state.messages),
  ]);

  return {
    solution_1: mistral_solution.text,
    solution_2: cohere_solution.text,
  };
};

// Judge Node: Evaluate and score both solutions
const judgeNode: GraphNode<typeof State> = async (state) => {
  const judgePrompt = `
You are an expert judge evaluating AI responses. 

User Question: ${state.messages[0].content}

Solution 1 (Mistral):
${state.solution_1}

Solution 2 (Cohere):
${state.solution_2}

Evaluate both solutions on:
- Accuracy and correctness
- Completeness of the answer
- Clarity and coherence

Respond ONLY with a JSON object in this exact format:
{
  "winner": "solution_1" or "solution_2",
  "solution_1_score": number between 0-100,
  "solution_2_score": number between 0-100,
  "reasoning": "brief explanation of your decision"
}
`;

  const judgeResponse = await geminiModel.invoke([
    new SystemMessage("You are a fair and objective judge. Always respond with valid JSON only."),
    new HumanMessage(judgePrompt),
  ]);

  // Parse the JSON response
  let judgment;
  try {
    const text = judgeResponse.text.trim();
    // Extract JSON if wrapped in markdown code blocks
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/```\s*([\s\S]*?)\s*```/);
    const jsonStr = jsonMatch ? jsonMatch[1] : text;
    judgment = JSON.parse(jsonStr);
  } catch (e) {
    // Fallback if parsing fails
    judgment = {
      winner: "solution_1",
      solution_1_score: 50,
      solution_2_score: 50,
      reasoning: "Failed to parse judge response: " + judgeResponse.text,
    };
  }

  return {
    judge_recommendation: judgment,
  };
};

// Build the graph: START → solution → judge → END
const graph = new StateGraph(State)
  .addNode("solution", solutionNode)
  .addNode("judge", judgeNode)
  .addEdge(START, "solution")
  .addEdge("solution", "judge")
  .addEdge("judge", END)
  .compile();

export default async function (userMessage: string) {
  const result = await graph.invoke({
    messages: [new HumanMessage(userMessage)],
  });

  console.log("=== BATTLE RESULT ===");
  console.log("Solution 1 (Mistral):", result.solution_1);
  console.log("Solution 2 (Cohere):", result.solution_2);
  console.log("Judge:", result.judge_recommendation);

  return {
    question: userMessage,
    solution_1: result.solution_1,
    solution_2: result.solution_2,
    winner: result.judge_recommendation.winner,
    scores: {
      solution_1: result.judge_recommendation.solution_1_score,
      solution_2: result.judge_recommendation.solution_2_score,
    },
    reasoning: result.judge_recommendation.reasoning,
  };
}

// hello my name surya tyagi 