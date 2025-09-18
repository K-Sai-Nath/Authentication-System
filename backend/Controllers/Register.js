const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = jwt.sign(
      { user_id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    res.json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = Register;
