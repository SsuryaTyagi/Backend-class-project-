const { Router } = require("express");
const { registerController, loginController } = require("../controllers/auth.controller");


const userRouter = Router();

userRouter.post("/register",registerController)
userRouter.post("/login",loginController)

module.exports = userRouter