const jwt = require("jsonwebtoken");


const generateVerificationToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_VERIFY_SECRET,
    { expiresIn: "24h" }
  );
};

const verifyVerificationToken = (token) => {
  return jwt.verify(token, process.env.JWT_VERIFY_SECRET);
};


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