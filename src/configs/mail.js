const nodemailer = require("nodemailer");

// PLEASE UPDATE USER AND PASSWORD BEFORE RUNNING THE CODE

// create reusable transporter object using the default SMTP transport
    module.exports = nodemailer.createTransport({
      service: "gmail",
      // port: 587,
      // secure: false, // true for 465, false for other ports
      auth: {
        user: "h3ll00p@gmail.com", // generated ethereal user
        pass: "hi73ndr4", // generated ethereal password
      },
    });