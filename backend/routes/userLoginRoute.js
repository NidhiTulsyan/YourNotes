const express = require("express");
const env = require('dotenv').config();
const route = express.Router();
const User = require("../models/userLogin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const JWT_SECRET = process.env.JWT_SECRET;
const decodeToken = require("../middleware/decodeToken");

route.get("/", (req, res) => {
  try {
    // console.log(req.body);
  res.json("hello");
  } catch (error) {
    res.send(error)
  }
  
});

//ROUTE:1 =>user route to create a new user and add it to database
route.post(
  "/createuser",
  body("name", "enter a valid name").isLength({ min: 3 }),
  body("email", "enter a valid email").isEmail(),
  body("password", "enter a valid password of min 5 digits long").isLength({
    min: 5,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //checking if user with register email already exists or not
    const { name, email, password } = req.body;
    let user = await User.findOne({ email: req.body.email });
    // console.log(user);
    if (user) {
      success=false;
      return res.status(400).json({
        success,
        error: "sorry user already exists, Please try with another email",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    user = await User.create({
      name,
      email,
      password: hashPassword,
    });
    const data = {
      id: user.id,
    };
    console.log(data);
    const authToken = jwt.sign(data, JWT_SECRET);
    success=true;
    await user
      .save()
      .then((user) => res.json({ success,authToken: authToken, user: user }))
      .catch((err) => res.json(err));
    // res.send(req.body)
  }
);

//ROUTE:2 =>now login of user with registered email and password
route.post(
  "/login",
  body("email", "enter a valid email").isEmail(),
  body("password").exists(),
  async (req, res) => {
    let success="";
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //checking if user with register email already exists or not
    const { email, password } = req.body;
    let user = await User.findOne({ email: req.body.email });
    // console.log(user);
    if (!user) {
      success=false;
      res.status(400).json({ success,error: "please check your email" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      success=false;
      res.status(400).json({success, error: "please check your password" });
    }
    const data = {
      id: user.id,
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success,authToken: authToken });
  }
);

//ROUTE:3 =>fetching user data who is logged in by using validate token middleware
route.post("/getuser", decodeToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({"error":"internal server error"});
  }
});

module.exports = route;
