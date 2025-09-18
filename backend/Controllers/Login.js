const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });
    if (user && user.googleId && !user.password) {
      return res.status(400).json({
        message: "Account registered via Google. Please log in with Google.",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
    const token = jwt.sign(
      { user_id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    });
    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = Login;
