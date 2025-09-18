const jwt = require("jsonwebtoken");

const Get = (req, res) => {
  return res.json({ message: "User fetched successfully", user: req.user });
};
module.exports = Get;
