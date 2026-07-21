import express from "express";
import userGraph from "./services/grap.ai.service.js"

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});


app.post("/use-graph", async (req, res) => {
  const { message } = req.body;
  const result = await userGraph(message || "what is the capital of France?");
  res.status(200).json(result);
});

export default app;
