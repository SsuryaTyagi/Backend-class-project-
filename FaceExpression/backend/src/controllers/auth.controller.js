require("dotenv").config();
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const registerController = async (req, res) => {
  try {
    console.log("REGISTER HIT");
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const isAlreadyExists = await userModel.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (isAlreadyExists) {
      return res.status(409).json({
        message:
          isAlreadyExists.email === email
            ? "Email already exists"
            : "Username already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashPassword,
    });

    const token = generateToken(user);
    res.cookie("token", token);

    res.status(201).json({
      message: "user successfully register",
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
const loginController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if ((!username && !email) || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const User = await userModel.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (!User) {
      return res.status(404).json({
        message: "user not found.",
      });
    }

    const validPass = await bcrypt.compare(password, User.password);

    if (!validPass) {
      return res.status(401).json({
        message: "invalid password",
      });
    }

    const token = generateToken(User);
    res.cookie("token", token);

    res.status(200).json({
      message: "user successfully login",
      user: {
        username: User.username,
        email: User.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  registerController,
  loginController,
};
