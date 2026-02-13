const express = require("express");
const userModel = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isUserAllreadExist = await userModel.findOne({ email });
    if (isUserAllreadExist) {
      return res.status(409).json({
        message: "user allready exist",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashPassword,
    });

    // token
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);

    res.cookie("token", token);

    res.status(201).json({
      message: "user created successfull",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "user not found ...",
      });
    }
    const MatchPassword = await bcrypt.compare(password, user.password);
    if (!MatchPassword) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);

    res.cookie("token", token);

    res.status(200).json({
      message: "user successfull login",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

authRouter.get("/profil", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "token missing",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (!decoded) {
      return res.status(403).json({
        message: "token invaild",
      });
    }
    const user = await userModel.findOne({ _id: decoded.id });

    res.status(200).json({
      message: "profile fetching",
      user,
    });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({
        message:"internal server error"
    })
  }
});
module.exports = authRouter;
