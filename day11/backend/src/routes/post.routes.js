const express = require("express");
const Controller = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })
const identifyUser = require("../middlewares/auth.middleware");
const { post } = require("./user.routes");

const postRouter = express.Router();



postRouter.post("/", upload.single('image'),identifyUser,Controller.postController);
postRouter.get("/",identifyUser,Controller.getPostController)
postRouter.get("/details/:postId",identifyUser,Controller.getPostDetailsController)
postRouter.post("/like/:postId",identifyUser,Controller.likePostController);


module.exports = postRouter;