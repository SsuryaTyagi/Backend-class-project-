const express = require("express");
const router = express.Router();
const { registerValidator } = require("../validator/auth.validator");
const {
  RegisterController,
  VerifyEmailController,
  LoginController
} = require("../controllers/auth.controller");

router.post("/register", registerValidator, RegisterController);
router.get("/verify-email/:token", VerifyEmailController);
router.post("/login", LoginController);

module.exports = router;
