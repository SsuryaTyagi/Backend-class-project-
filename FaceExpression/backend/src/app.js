const express = require("express");
const  cookieParser = require('cookie-parser');

const app = express()
app.use(express.json());
app.use(cookieParser())

// Require Routers
const userRouter = require("./routes/user.routes");

app.use("/", userRouter)

module.exports = app