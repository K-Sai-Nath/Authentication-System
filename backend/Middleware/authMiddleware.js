const jwt = require("jsonwebtoken");
const VerifyAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ message: "Unauthorized,token not found" });
    }
    const result = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = {
      id: result.user_id,
      role: result.role,
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
module.exports = VerifyAuth;
