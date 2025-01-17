const nodemailer = require("nodemailer");

module.exports.sendMail = (email, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "buinguyentruc2003tb@gmail.com",
      pass: "phtv odlp xkxf pkkg", // Mật khẩu thực tế nên được bảo mật
    },
  });

  const mailOptions = {
    from: "buinguyentruc2003tb@gmai.com",
    to: email,
    subject: subject,
    html: html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      // do something useful
    }
  });
};
