const userModel = require("../models/user.model");
const { sendVerificationEmail } = require("../services/email.service");
const { sendSuccess, sendError } = require("../utils/sendView");
const {
  generateVerificationToken,
  verifyVerificationToken,
} = require("../utils/jwt.utils");

// ─── Register ──────────────────────────────────────────────
const RegisterController = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      const field = existingUser.email === email ? "Email" : "Username";
      return res.status(409).json({ success: false, message: `${field} already taken` });
    }

    const newUser = await userModel.create({ username, email, password });

    const verificationToken = generateVerificationToken(email);

    sendVerificationEmail(email, username, verificationToken).catch((err) =>
      console.error("Email Error:", err)
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
      return res.status(409).json({ success: false, message: `${field} already exists` });
    }
    console.error("Register Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ─── Verify Email ──────────────────────────────────────────
const VerifyEmailController = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = verifyVerificationToken(token);

    const user = await userModel.findOne({ email: decoded.email });

    if (!user)         return sendError(res, 400, "Invalid verification link");
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

module.exports = { RegisterController, VerifyEmailController };