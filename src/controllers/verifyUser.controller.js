const express = require("express");

const {sendMail} = require("../utils/mail");


const router = express.Router();

router.get("/user", (req, res) => {
  try {
    return res.status(200).send(req.user);


  } catch (e) {
    res.status(500).send(e.message);
  }
});


router.get("/otp", (req, res) => {
    try{
        const otp = Math.floor(100000 + Math.random() * 900000);

    const message = `Your OTP for your order is ${otp}`;

    const user = req.user;

    sendMail({
      from: "h3ll00p@gmail.com",
      to: user.email,
      subject: `Hi ${user.name} please verify your order`,
      text: `Hi ${user.name}, ${message}`,
    });

    return res.status(200).send({otp});
    }catch(e){
        res.status(500).send(e.message);
    }

})

module.exports = router;
