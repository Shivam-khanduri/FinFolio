const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio.model'); // Make sure this path is correct

// GET portfolio for a user
router.get('/api/portfolio/:userName', async (req, res) => {
  try {
    const userName = req.params.userName;
    console.log(`➡️ GET /api/portfolio/${userName}`);

    if (!userName) {
      return res.status(400).json({ message: 'Missing userName' });
    }

    const portfolio = await Portfolio.find({ userName });
    res.status(200).json(portfolio);
  } catch (err) {
    console.error('❌ Error fetching portfolio:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST add stock to user's portfolio
router.post('/api/portfolio', async (req, res) => {
  try {
    const { userName, name, symbol, shares, livePrice } = req.body;

    if (!userName || !name || !symbol || !shares || !livePrice) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    console.log(`➡️ POST /api/portfolio for ${userName} - ${symbol}`);

    const existing = await Portfolio.findOne({ userName, symbol });

    if (existing) {
      // If stock already exists in portfolio, update shares and livePrice
      existing.shares += shares;
      existing.livePrice = livePrice;
      await existing.save();
      return res.status(200).json(existing);
    }

    const newStock = new Portfolio({
      userName,
      name,
      symbol,
      shares,
      livePrice,
      avgPrice: livePrice, // You can adjust this logic
    });

    await newStock.save();
    res.status(201).json(newStock);
  } catch (err) {
    console.error('❌ Error saving stock:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// DELETE a stock from portfolio
router.delete('/api/portfolio/:userName/:symbol', async (req, res) => {
  try {
    const { userName, symbol } = req.params;
    console.log(`➡️ DELETE /api/portfolio/${userName}/${symbol}`);

    await Portfolio.deleteOne({ userName, symbol });
    res.status(200).json({ message: 'Stock deleted from portfolio' });
  } catch (err) {
    console.error('❌ Error deleting stock:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
