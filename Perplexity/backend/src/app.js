const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
   


const app = express();
app.use(cors ({
  origin:"http://localhost:5173",
  credentials: true,
}));


app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

const authRouter = require("./routes/auth.routes")
const chatRouter = require("./routes/chat.routes.js")

app.use("/", authRouter)
app.use("/api/chat", chatRouter)


module.exports = app