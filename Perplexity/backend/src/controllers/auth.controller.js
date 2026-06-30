const userModel = require("../models/user.model");
const { sendVerificationEmail } = require("../services/email.service");
const { sendSuccess, sendError } = require("../utils/sendView");
const {
  generateVerificationToken,
  verifyVerificationToken,
} = require("../utils/jwt.utils");
const { selectFields } = require("express-validator/lib/field-selection");

// ─── Register ──────────────────────────────────────────────
const RegisterController = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      const field = existingUser.email === email ? "Email" : "Username";
      return res
        .status(409)
        .json({ success: false, message: `${field} already taken` });
    }

    const newUser = await userModel.create({ username, email, password });

    const verificationToken = generateVerificationToken(email);

    sendVerificationEmail(email, username, verificationToken).catch((err) =>
      console.error("Email Error:", err),
    );

    return res.status(201).json({
      success: true,
      message: "Registration successful! Please verify your email.",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        verified: newUser.verified,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res
        .status(409)
        .json({ success: false, message: `${field} already exists` });
    }
    console.error("Register Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// ─── Verify Email ──────────────────────────────────────────
const VerifyEmailController = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = verifyVerificationToken(token);

    const user = await userModel.findOne({ email: decoded.email });

    if (!user) return sendError(res, 400, "Invalid verification link");
    if (user.verified) return sendError(res, 400, "Email already verified");

    user.verified = true;
    await user.save();

    return sendSuccess(res);
  } catch (error) {
    if (error.name === "TokenExpiredError")
      return sendError(res, 400, "Verification link has expired");
    if (error.name === "JsonWebTokenError")
      return sendError(res, 400, "Invalid verification link");

    console.error("Verify Error:", error);
    return sendError(res, 500, "Something went wrong");
  }
};

const LoginController = async (req, res) => {
  const { username, email, password } = req.body;

  const User = await userModel
    .findOne({ $or: [{ email }, { username }] }).select('+password')

  if (!User) {
    return res.status(404).json({
      message: "user not found.",
    });
  }

  const validPass = await User.comparePassword(password);
  if (!validPass) {
    return res.status(401).json({
      message: "Invalid password.",
    });
  }
  if (!User.verified) {
    return res.status(403).json({
      message: "Account not verified. Please check your email.",
    });
  }

  const token = generateVerificationToken(User);
  res.cookie("token", token);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: User._id,
        username: User.username,
        email: User.email,
        verified: User.verified,
      },
    });;
};

const getMe = async (req, res) => {
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    message: "User fetched successfully",
    user,
  });
};

module.exports = { RegisterController, VerifyEmailController, LoginController, getMe };
