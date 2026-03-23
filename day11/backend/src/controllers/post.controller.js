require("dotenv").config();
const postModel = require("../models/post.models");
const likeModel = require("../models/like.models");
const { ImageKit, toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});

const postController = async (req, res) => {
  try {
    const response = await client.files.upload({
      file: await toFile(Buffer.from(req.file.buffer), "file"),
      fileName: "Test",
      folder: "cohort-2",
    });

    const post = await postModel.create({
      caption: req.body.caption,
      imageUrl: response.url,
      user: req.user.id,
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
  const userId = req.user.id;

  const posts = await postModel.find({ user: userId });

  res.status(200).json({
    message: "post fetched successfully",
    posts,
  });
};

const getPostDetailsController = async (req, res) => {
  const userId = req.user.id;
  const postID = req.params.postId.trim();

  const post = await postModel.findById(postID);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const isValidUser = post.user.toString() === userId;

  if (!isValidUser) {
    return res.status(403).json({
      messages: "forbidden Content ... ",
    });
  }
  res.status(200).json({
    message: "post fetched successfully",
    post,
  });
};

const likePostController = async (req, res) => {
  const likedUser = req.user.userName;
  const likePost = req.params.postId;

  const post = await postModel.findById(likePost);

  if (!post) {
    return res.status(404).json({
      message: "post not found",
    });
  }

  const like = await likeModel.create({
    post: likePost,
    user: likedUser,
  });

  res.status(200).json({
    message: "post like successfully.",
    like,
  });
};

const unLikePostController = async (req, res) => {
  const likedUser = req.user.userName;
  const postId = req.params.postId;

  const likePost = await likeModel.findById(postId);

  if (!likePost) {
    return res.status(404).json({
      message: "post not found",
    });
  }

  await likeModel.findByIdAndDelete({ _id: likePost._id });

  res.status(200).json({
    message: "post Unlike successfully.",
  });
};

const getFeedController = async (req, res) => {
  const username = req.user.userName;

  const posts = await Promise.all(
    (await postModel.find({}).sort({ _id: 1 }).populate("user").lean()).map(
      async (post) => {
        const isLiked = await likeModel.findOne({
          user: username,
          post: post._id,
        });

        // console.log(isLiked);

        post.isLiked = !!isLiked;

        return post;
      },
    ),
  );

  res.status(200).json({
    message: "posts fetched successfully..",
    posts,
  });
};
module.exports = {
  postController,
  getPostController,
  getPostDetailsController,
  likePostController,
  getFeedController,
  unLikePostController
};
