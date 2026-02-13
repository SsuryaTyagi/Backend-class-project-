const express = require("express");
const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken');
require("dotenv").config()




const authRouter = express.Router();


// create register route
authRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // find user
    const isUserAllreadyExist = await userModel.findOne({ email });

    if (isUserAllreadyExist) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const user = await userModel.create({
      name,
      email,
      password,
    });

    // Create JWT token 
    const token = jwt.sign({id:user._id,email:user.email}, process.env.JWT_KEY);

    // cookie 
    res.cookie("jwt_token",token);

    res.status(201).json({
      message: "user created successfully...",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// export authRoute
module.exports = authRouter;
