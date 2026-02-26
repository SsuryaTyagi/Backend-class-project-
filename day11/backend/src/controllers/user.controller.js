const followModel = require("../models/follow.models");
const { findById } = require("../models/post.models");
const userModel = require("../models/user.models");

const userconstroller = async (req, res) => {
  const followerUserName = req.user.userName;
  const followeeUserName = req.params.userName;

  if (followeeUserName === followerUserName) {
    return res.status(400).json({
      message: "you connot follow yourself",
    });
  }
  const userExists = await userModel.findOne({
    username: followeeUserName,
  });

  if (!userExists) {
    return res.status(404).json({
      message: "User you are trying to follow does not exists",
    });
  }

  const isValidUser = await followModel.findOne({
    follower: followerUserName,
    followee: followeeUserName,
  });

  if (isValidUser) {
    if (isValidUser.status === "pending") {
      return res.status(200).json({
        message: "Follow request alread send",
      });
    }
    if (isValidUser.status === "accepted") {
      return res.status(200).json({
        message: "You are already following",
      });
    }
  }

  const followRecode = await followModel.create({
    follower: followerUserName,
    followee: followeeUserName,
    status: "pending",
  });

  res.status(201).json({
    message: "Follow request sent",
    follow: followRecode,
  });
};

const unfollowUserController = async (req, res) => {
  const followerUserName = req.user.userName;
  const followeeUserName = req.params.userName;

  const isUserFollowing = await followModel.findOne({
    follower: followerUserName,
    followee: followeeUserName,
  });

  if (!isUserFollowing) {
    return res.status(200).json({
      message: "you are not following",
    });
  }
  await followModel.findByIdAndDelete(isUserFollowing._id);

  res.status(200).json({
    message: "you have unfollowed",
  });
};
const acceptFollowController = async (req, res) => {
  const userName = req.user.userName;
  const requestId = req.params.id;

  const request = await followModel.findById(requestId);

  if (!request) {
    return res.status(404).json({
      message: "Request not found",
    });
  }
  if (request.followee !== userName) {
    return res.status(403).json({ message: "Not allowed" });
  }

  if (request.status !== "pending") {
    return res.status(400).json({ message: "Request already processed" });
  }

  request.status = "accepted";
  await request.save();

  res.json({ message: "Follow request accepted" });
};
const rejectedFollowController = async (req, res) => {
  const userName = req.user.userName;
  const requestId = req.params.id;

  const request = await followModel.findById(requestId);

  if (!request) {
    return res.status(404).json({
      message: "Request not found",
    });
  }
  if (request.followee !== userName) {
    return res.status(403).json({ message: "Not allowed" });
  }

  await followModel.deleteOne({ _id: requestId });

  res.json({ message: "Follow request rejected" });
};
module.exports = {
  userconstroller,
  unfollowUserController,
  acceptFollowController,
  rejectedFollowController,
};
