const express = require("express");
const Controller = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })

const postRouter = express.Router();



postRouter.post("/", upload.single('image'),Controller.postController);
postRouter.get("/",Controller.getPostController)
postRouter.get("/details/:postId",Controller.getPostDetailsController)



module.exports = postRouter;