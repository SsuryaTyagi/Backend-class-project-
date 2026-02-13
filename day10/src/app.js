const express = require("express");
const cookie = require("cookie-parser")
const authRouter = require("./routes/auth.routes")

const app = express();

app.use(express.json());
app.use(cookie());


app.use("/",authRouter);

module.exports = app;