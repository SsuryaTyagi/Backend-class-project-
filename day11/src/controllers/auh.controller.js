const userModel = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

 const registerController = async (req, res) => {
  try {
    const { username, email, password, bio, profile_img } = req.body;

    const isUserAlreadExists = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserAlreadExists) {
      return res.status(409).json({
        message:
          "user already exists " + isUserAlreadExists.email === email
            ? "email already exists"
            : "user already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      bio,
      profile_img,
      password: hashPassword,
    });

    // coman data everuser unique
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: "1d",
    });

    res.cookie("token", token);

    res.status(201).json({
      message: "user successfully register",
      user: {
        username: user.username,
        email: user.email,
        bio: user.bio,
        profile_img: user.profile_img,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

const loginController =  async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    const passvalid = await bcrypt.compare(password, user.password);

    if (!passvalid) {
      return res.status(401).json({
        message: "password invalid",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: "1d",
    });

    res.cookie("token", token);

    res.status(201).json({
      message: "user successfully login",
      user: {
        username: user.username,
        email: user.email,
        bio: user.bio,
        profile_img: user.profile_img,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "login failed. Please try again.",
      error: error.message,
    });
  }
}

module.exports = {
    registerController,
    loginController
}