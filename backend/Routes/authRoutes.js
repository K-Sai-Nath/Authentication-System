const express = require("express");
const router = express.Router();
const VerifyAuth = require("../Middleware/authMiddleware");
const Google = require("../Controllers/Google");
const Get = require("../Controllers/Get");
const Login = require("../Controllers/Login");
const Register = require("../Controllers/Register");
router.post("/login", Login);
router.post("/register", Register);
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
});
router.post("/google", Google);
router.get("/get", VerifyAuth, Get);
module.exports = router;
