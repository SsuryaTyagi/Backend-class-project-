const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token not found , Unauthorized access",
    });
  }



  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_VERIFY_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "unauthorized access",
      error: error.message,
    });
  }

  req.user = decoded;
  next();
};

module.exports = authUser;
