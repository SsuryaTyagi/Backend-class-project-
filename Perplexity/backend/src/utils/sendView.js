const path = require("path");
const fs = require("fs");

// Files ek baar read karo
const successHTML = fs.readFileSync(
  path.join(__dirname, "../views/success.html"), "utf-8"
);
const errorHTML = fs.readFileSync(
  path.join(__dirname, "../views/error.html"), "utf-8"
);

const sendSuccess = (res) => {
  return res.status(200).send(successHTML);
};

const sendError = (res, status, message) => {
  const html = errorHTML.replace("{{MESSAGE}}", message);
  return res.status(status).send(html);
};

module.exports = { sendSuccess, sendError };