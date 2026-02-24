const jwt = require("jsonwebtoken");

const identifyUser = (req, res, next) => {
  let token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token is not fount, Unauthorized access",
    });
  }

  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_KEY);
  } catch (error) {
    res.status(401).json({
      message: "user not authorized",
    });
  }
  req.user = decoded;
  next()
};


module.exports = identifyUser