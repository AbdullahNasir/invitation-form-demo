const nodemailer = require('nodemailer');
const { nodeMailerCreds } = require('../config/config');
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  service: 'gmail',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    ...nodeMailerCreds
  },
  tls: {
    rejectUnauthorized: false
  }
});

const sendEmail = mailOptions => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        reject(err);
      }
      resolve(info);
    });
  });
};

module.exports = {
  transporter,
  sendEmail
};
