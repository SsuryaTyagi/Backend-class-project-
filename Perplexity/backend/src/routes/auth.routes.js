const express = require("express");
const router = express.Router();
const { registerValidator } = require("../validator/auth.validator");
const {
  RegisterController,
  VerifyEmailController,
} = require("../controllers/auth.controller");

router.post("/register", registerValidator, RegisterController);
router.get("/verify-email/:token", VerifyEmailController);

module.exports = router;
