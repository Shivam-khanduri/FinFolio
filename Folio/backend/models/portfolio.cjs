const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
  name: String,
  symbol: String,
  shares: Number,
  livePrice: Number,
  userName: String, // <-- important to tie portfolio to user
});

module.exports = mongoose.model("Portfolio", PortfolioSchema);
