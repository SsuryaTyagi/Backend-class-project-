const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

const authRouter = express.Router();

// create register route
authRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // find user
    const isUserAllreadyExist = await userModel.findOne({ email });

    if (isUserAllreadyExist) {
      return res.status(409).json({
        message: "User allready exist",
      });
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashPassword,
    });

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_KEY,
    );

    // cookie
    res.cookie("jwt_token", token);

    res.status(201).json({
      message: "user created successfully...",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error....",
    });
  }
});

// login api
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    // check user
    if (!user) {
      return res.status(404).json({
        message: "user not found with this email...",
      });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    // create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);

    res.cookie("jwt_token", token);

    res.status(200).json({
      message: "Login successful",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// export authRoute
module.exports = authRouter;
