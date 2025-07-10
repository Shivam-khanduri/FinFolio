const Portfolio = require('../models/Portfolio.cjs');

// Get all stocks for a user
const getPortfolio = async (req, res) => {
  try {
    const userName = req.params.userName;
    const stocks = await Portfolio.find({ userName });
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching portfolio", error: err });
  }
};

// Add a stock
const addStock = async (req, res) => {
  try {
    const newStock = new Portfolio(req.body);
    await newStock.save();
    res.status(201).json(newStock);
  } catch (err) {
    res.status(400).json({ message: "Error saving stock", error: err });
  }
};

// Delete stock
const deleteStock = async (req, res) => {
  try {
    const { userName, symbol } = req.params;
    await Portfolio.findOneAndDelete({ userName, symbol });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting", error: err });
  }
};

module.exports = { getPortfolio, addStock, deleteStock };
