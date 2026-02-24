require("dotenv").config();
const postModel = require("../models/post.models");
const { ImageKit, toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});

const postController = async (req, res) => {
  try {
    console.log(req.body, req.file);

    let token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Token is not fount, Unauthorized access",
      });
    }

    let decoded = null;
    try {
      decoded = jwt.verify(token, process.env.JWT_KEY);
    } catch (error) {
      res.status(401).json({
        message: "user not authorized",
      });
    }

    const response = await client.files.upload({
      file: await toFile(Buffer.from(req.file.buffer), "file"),
      fileName: "Test",
      folder: "cohort-2",
    });

    const post = await postModel.create({
      caption: req.body.caption,
      imageUrl: response.url,
      user: decoded.id,
    });

    res.status(201).json({
      message: "File uploaded successfully",
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Upload failed" });
  }
};

const getPostController = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token is not fount, Unauthorized access",
    });
  }

  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_KEY);
  } catch (error) {
    res.status(401).json({
       error: error.message,
      message: "Token is not verify",
    });
  }

  const userId = decoded.id

  const posts = await postModel.find({ user: userId });

  res.status(200).json({
    message:"post fetched successfully",
    posts,
  })
};

const getPostDetailsController = async (req, res) =>{
  const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Token is not fount, Unauthorized access",
      });
    }

    let decoded = null;
    try {
      decoded = jwt.verify(token, process.env.JWT_KEY);
    } catch (error) {
      res.status(401).json({
        message: "user not authorized",
      });
    }
    const userId = decoded.id;
    const postID = req.params.postId;

    const post = await postModel.findById(postID);


    if(!post){
      return res.status(404).json({
        message:"Post not found"
      })
    }

    const isValidUser = post.user.toString() === userId;

    if (!isValidUser) {
      return res.status(403).json({
        messages:"forbidden Content ... "
      })
    }
     res.status(200).json({
      message:"post fetched successfully",
      post
     })
}
module.exports = {
  postController,
  getPostController,
  getPostDetailsController
};
