const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  userName: String,
  name: String,
  symbol: String,
  shares: Number,
  livePrice: Number,
  avgPrice: Number,
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
