const User = require("../models/user.model");

const jwt = require("jsonwebtoken");
const { cookie } = require("express-validator");
require("dotenv").config();

const newToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
};

const register = async (req, res) => {
  try {
    // check if the user already exists
    const user = await User.findOne({ email: req.body.email });

    // if the user already exists then return an error
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // if the user does not exist then create a new user

    // check if the password and repeat password are the same or not
    // if not then return an error
    if (req.body.password !== req.body.repeatPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    // if the password and repeat password are the same then create a new user
    const newUser = await User.create(req.body);

    // create a new token for the user
    const token = newToken(newUser);

    // send the token and the user
    return res.status(201).send({ newUser, token });
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

const login = async (req, res) => {
  console.log(req.body);
  try {
    // check if the user exists
    const user = await User.findOne({ email: req.body.email });

    // if the user does not exist then return an error
    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }

    // if the user exists then compare the password with the hash password
    // if the passwords are not the same then return an error
    if (!user.comparePassword(req.body.password)) {
      return res.status(400).json({
        message: "Email or Password is incorrect",
      });
    }

    // if the passwords are the same then create a new token for the user
    const token = newToken(user);

    

    // not working for some reason check later
    res.cookie("token", token, {
      httpOnly: true,
    });


    // send the token and the user
    return res.status(200).send({ user, token });
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

module.exports = { register, login };
