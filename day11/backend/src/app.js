const express = require("express");
const cookie = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookie());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Require Routers
const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes");
const userRouter = require("./routes/user.routes");

app.use("/", authRouter);
app.use("/api/post", postRouter);
app.use("/api/user", userRouter);

module.exports = app;
