const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const Google = async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { sub, email, name } = ticket.getPayload();
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, googleId: sub });
    }
    const new_token = jwt.sign(
      { user_id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2d" }
    );
    res.cookie("token", new_token, {
      httpOnly: true,
      secure: true,
    });
    res.json({ message: "Google login successful" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Google login failed" });
  }
};
module.exports = Google;
