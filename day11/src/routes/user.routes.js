const express = require("express");
const identifyUser = require("../middlewares/auth.middleware")
const followController = require("../controllers/user.controller")

const userRouter = express.Router();

userRouter.post("/follow/:userName",identifyUser,followController.userconstroller);



module.exports =  userRouter;