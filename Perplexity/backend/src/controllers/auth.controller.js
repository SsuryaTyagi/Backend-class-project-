const userModel = require("../models/user.model");

const RegisterController = async (req, res) => {

  const { username, email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      const field = existingUser.email === email ? "Email" : "Username";
      return res.status(409).json({
        success: false,
        message: `${field} already taken`,
      });
    }

    // 3. User create karo — password model ke pre('save') mein auto-hash hoga
    const newUser = await userModel.create({ username, email, password });

    // 4. Response mein sirf safe fields bhejo
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        verified: newUser.verified,
        createdAt: newUser.createdAt,
      },
    });

  } catch (error) {
    // Mongoose duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(409).json({
        success: false,
        message: `${field} already exists`,
      });
    }

    console.error("Register Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { RegisterController };