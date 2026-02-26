const express = require("express");
const identifyUser = require("../middlewares/auth.middleware")
const followController = require("../controllers/user.controller")

const userRouter = express.Router();

userRouter.post("/follow/:userName",identifyUser,followController.userconstroller);
userRouter.post("/unfollow/:userName",identifyUser,followController.unfollowUserController);
userRouter.patch("/follow/accept/:id",identifyUser,followController.acceptFollowController);
userRouter.patch("/follow/rejected/:id",identifyUser,followController.rejectedFollowController);



module.exports =  userRouter;