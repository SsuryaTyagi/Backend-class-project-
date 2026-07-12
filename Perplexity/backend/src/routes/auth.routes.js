const express = require("express");
const router = express.Router();
const { registerValidator } = require("../validator/auth.validator");
const {
  RegisterController,
  VerifyEmailController,
  LoginController,
  getMe,
  logout
} = require("../controllers/auth.controller");
const authUser = require("../Middlewares/auth.middleware");



router.post("/register", registerValidator, RegisterController);
router.get("/verify-email/:token", VerifyEmailController);
router.post("/login", LoginController);
router.get("/getMe", authUser, getMe);
router.post("/logout",logout)

module.exports = router;
