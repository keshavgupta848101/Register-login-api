const express = require("express");
const app = express();
const router = express.Router();
const bcryptJs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dbUser = require("./model/user");
const connectDB = require("./database");
const register = require("./register");
const login = require("./login");

const PORT = process.env.PORT || 3000;
app.use(express.json());
connectDB();
app.use("/api/v1", register);
app.use("/api/v1", login);

app.get("/", (req, res) => {
  res.send("Broooooo");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
