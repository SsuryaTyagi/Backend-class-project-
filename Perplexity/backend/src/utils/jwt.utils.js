const jwt = require("jsonwebtoken");

// ─── Verification Token (Email verify ke liye) ─────────────
const generateVerificationToken = (email) => {
  return jwt.sign(
    { email },
    process.env.JWT_VERIFY_SECRET,
    { expiresIn: "24h" }
  );
};

const verifyVerificationToken = (token) => {
  return jwt.verify(token, process.env.JWT_VERIFY_SECRET);
};

// ─── Access Token (Login ke liye) ──────────────────────────
const generateAccessToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "7d" }
  );
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
};

module.exports = {
  generateVerificationToken,
  verifyVerificationToken,
  generateAccessToken,
  verifyAccessToken,
};