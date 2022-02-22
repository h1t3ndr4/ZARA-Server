const express = require("express");

const connect = require("./configs/db");

const app = express();

app.use(express.json());

app.listen(80, async () => {
  try {
    await connect();
    console.log("Server is up on port 200");
  } catch (e) {
    console.log(e);
  }
});
