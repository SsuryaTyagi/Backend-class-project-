import { StateSchema, MessagesValue,ReducedValue, StateGraph, START, END } from "@langchain/langgraph";
import type { GraphNode } from "@langchain/langgraph";


type JUGEMENT = {
    winner: "solution_1" | "slution_2",
    solution_1_score: number,
    solution_2_score: number,
}

type AIBATTLESTATE = {
    message: typeof MessagesValue,
    solution_1: string,
    solution_2: string,
    jugment: JUGEMENT
}

const State: AIBATTLESTATE = {
  message: MessagesValue,
  solution_1: "",
  solution_2: "",
  jugment: {
    winner: "solution_1",
    solution_1_score: 0,
    solution_2_score: 0,
  },
};