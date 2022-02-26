require("dotenv").config();
const User = require("../models/user.model");

const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      return res.status(401).send("Unauthorized request");

    if (req.headers.authorization.split(" ")[0] !== "Bearer")
      return res.status(401).send("Unauthorized request");

    const token = req.headers.authorization.split(" ")[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!payload) return res.status(401).send("Unauthorized request");

    const user = await User.findById(payload.user._id);

    console.log(payload);

    if (!user) return res.status(401).send("Unauthorized request");

    req.user = user;

    next();
  } catch (e) {
    res.status(500).send(e.message);
  }
};
