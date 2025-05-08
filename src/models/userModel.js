const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  userType: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);