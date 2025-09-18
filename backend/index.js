const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const authRoutes = require("./Routes/authRoutes");
const mongoose = require("mongoose");
dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/auth", authRoutes);
const PORT = process.env.PORT || 8000;
mongoose
  .connect("mongodb://localhost:27017/auth-system")
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server Connected to PORT:", PORT);
    });
  })
  .catch((err) => {
    console.log("Error connecting mongoose");
  });
