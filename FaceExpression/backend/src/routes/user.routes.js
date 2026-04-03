const { Router } = require("express");
const {registerController, loginController, getMe, logout } = require("../controllers/auth.controller");
const authUser = require("../Middlewares/auth.middleware");

const userRouter = Router();

userRouter.post("/register", registerController);
userRouter.post("/login", loginController);
userRouter.get("/getMe", authUser, getMe);
userRouter.post("/logout", logout)

module.exports = userRouter;
