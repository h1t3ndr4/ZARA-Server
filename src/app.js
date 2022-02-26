const express = require("express");
const cookieParser = require("cookie-parser");


const PORT = process.env.PORT || 80;

const connect = require("./configs/db");

const authorization = require("./middlewares/authorization");

const productController = require("./controllers/product.controller");

const {login, register} = require("./controllers/auth.controller");

const userVerify = require("./controllers/verifyUser.controller");

const app = express();

app.use(express.json());

// app.use(cookieParser());

app.use("/products", productController);

app.use("/verify", authorization, userVerify);

app.post("/register", register);

app.post("/login", login);

app.listen(PORT, async () => {
  try {
    await connect();
    console.log("Server is up on port " + PORT);
  } catch (e) {
    console.log(e);
  }
});
