const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");

require("../database/connection");
const User = require("../model/userSchema");

// router.get("/", (req, res) => {
//   res.send("Hello World router js");
// });

router.post("/register", async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;

  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(422).json({ error: "Enter data in the feild" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ message: "User already exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ message: "User already exist" });
    } else {
      const user = new User({ name, email, phone, password, cpassword });

      await user.save();

      res.status(201).json({ message: "Registration successful !!" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Enter data in the feild" });
    }

    const userLogin = await User.findOne({ email: email });

    const token = await userLogin.generateAuthToken();
    console.log(token);

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credentials !!" });
      } else {
        res.status(200).json({ message: "User Logged in successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials !!" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
