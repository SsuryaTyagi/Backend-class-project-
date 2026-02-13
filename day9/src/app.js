// require express with express
const express = require("express");
const authRouter = require("./routes/auth.routes")
const cookieParser = require("cookie-parser"); 
// create server 
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/",authRouter);

// export app
module.exports = app;