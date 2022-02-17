const express = require("express");
const router = express.Router();
const dbUser = require("./model/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/login", async (req, res) => {
  const emailExist = await dbUser.findOne({ email: req.body.email });
  console.log(22);
  if (!emailExist) {
    return res
      .status(401)
      .json({ status: "failure", statusCode: 401, message: "Email not found" });
  }

  const validPass = await bcryptjs.compare(
    req.body.password,
    emailExist.password
  );
  if (!validPass) {
    return res.status(401).json({
      status: "failure",
      statusCode: 401,
      message: "Passsword not found",
    });
  }

  const token = jwt.sign({ _id: emailExist._id }, "Keshavguptaisawebdevloper");

  res.header("auth-token", token).send(token);

  res.send("logged in");
});

module.exports = router;
