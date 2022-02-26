const transporter = require("../configs/mail");

// send mail with defined transport object

const sendMail = async ({ from, to, subject, text }) => {
  await transporter.sendMail({
    from,
    to,
    subject,
    text,
  });
};



module.exports = { sendMail };
