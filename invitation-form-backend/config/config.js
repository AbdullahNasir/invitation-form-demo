require('dotenv').config();
exports.mongoDBUrl = 'mongodb://localhost:27017/invitation-form';

exports.nodeMailerCreds = {
  user: process.env.EMAIL,
  pass: process.env.PASS
};
