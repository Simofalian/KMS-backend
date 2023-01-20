const express = require("express");
const router = express.Router();
const passport = require("passport");

const emailController = require("./../controllers/emailController");

router.post(
  "/send-email",
  passport.authenticate("jwt", { session: false }),
  emailController.sendEmail
);

module.exports = router;
