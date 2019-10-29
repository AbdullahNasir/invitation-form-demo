const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const invitationSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('invitations', invitationSchema);
