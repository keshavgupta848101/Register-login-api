const express = require("express");
const router = express.Router();
const dbUser = require("./model/user");
const bcryptjs = require("bcryptjs");

// router.get("/keshav", (req, res) => {
//   res.send("Mother Board kaam kar jaaaa");
// });

router.use(express.json());

router.post("/register", async (req, res) => {
  try {
    const emailExist = await dbUser.findOne({ email: req.body.email });
    if (emailExist) {
      return res.status(401).json({
        status: "failure",
        statusCode: 401,
        message: "Email already exist",
      });
    }
    console.log("Email andar");
    const salt = await bcryptjs.genSalt(10);
    console.log(salt);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    };

    const savedUser = await dbUser.create(user);
    res
      .status(200)
      .json({ status: "success", statusCode: 200, response: savedUser });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
