const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },         
  dob: { type: String },           
  country: { type: String },
  username: { type: String },
  theme: { type: String, default: 'light' }
});

module.exports = mongoose.model('User', userSchema);
