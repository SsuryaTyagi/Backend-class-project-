const express = require("express");
const  cookieParser = require('cookie-parser');
const cors = require('cors')

const app = express()
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }));
app.use(cookieParser())

// Require Routers
const userRouter = require("./routes/user.routes");
const Router = require("./routes/song.routes");

app.use("/", userRouter)
app.use("/",Router)

module.exports = app