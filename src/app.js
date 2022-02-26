const express = require("express");
const cookieParser = require("cookie-parser");

const connect = require("./configs/db");

const productController = require("./controllers/product.controller");

const {login, register} = require("./controllers/auth.controller");

const app = express();

app.use(express.json());

// app.use(cookieParser());

app.use("/products", productController);

app.post("/register", register);

app.post("/login", login);

app.listen(process.env.PORT || 80, async () => {
  try {
    await connect();
    console.log("Server is up on port 80");
  } catch (e) {
    console.log(e);
  }
});
