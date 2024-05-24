const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: "teja.doodleblue@gmail.com",
    port: 465,
    secure: true,
    service: 'gmail',
    auth: {
      user: 'teja.doodleblue@gmail.com',
      pass: 'dfnu rgte kjja aclk'
    }
  });

exports.sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'teja.doodleblue@gmail.com',
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};


