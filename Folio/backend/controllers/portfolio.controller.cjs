const Portfolio = require('../models/Portfolio.cjs'); // Ensure this path is correct

// ✅ Save portfolio
const savePortfolio = async (req, res) => {
  try {
    console.log("📥 POST /api/portfolio | body:", req.body);

    const { symbol, name, shares, livePrice, userName } = req.body;

    if (!symbol || !name || !shares || !livePrice || !userName) {
      console.warn("⚠️ Missing required fields in request");
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingStock = await Portfolio.findOne({ symbol, userName });

    if (existingStock) {
      existingStock.shares += shares;
      existingStock.livePrice = livePrice;
      await existingStock.save();
      console.log("✅ Updated existing stock:", existingStock);
      return res.json({ message: "Updated existing stock", stock: existingStock });
    }

    const newStock = new Portfolio({ symbol, name, shares, livePrice, userName });
    await newStock.save();

    console.log("✅ New stock saved:", newStock);
    res.status(201).json({ message: "Stock saved", stock: newStock });

  } catch (err) {
    console.error("❌ Error in savePortfolio:", err.message);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

// ✅ Save stock to portfolio (alternative POST)
const saveStockToPortfolio = async (req, res) => {
  try {
    console.log("📥 POST /api/portfolio/stock | body:", req.body);

    const { symbol, name, shares, livePrice, userName } = req.body;

    const existingStock = await Portfolio.findOne({ symbol, userName });

    if (existingStock) {
      existingStock.shares += shares;
      existingStock.livePrice = livePrice;
      await existingStock.save();
      return res.json({ message: "Stock updated", stock: existingStock });
    }

    const newStock = new Portfolio({ symbol, name, shares, livePrice, userName });
    await newStock.save();

    res.status(201).json({ message: "Stock added", stock: newStock });
  } catch (error) {
    console.error("❌ Error saving stock:", error.message);
    res.status(500).json({ message: "Error saving stock", error: error.message });
  }
};

// ✅ Get user's portfolio
const getUserPortfolio = async (req, res) => {
  try {
    const { userName } = req.params;
    console.log("🔍 GET /api/portfolio/:userName | user:", userName);

    if (!userName) {
      return res.status(400).json({ message: "Username is required" });
    }

    const portfolio = await Portfolio.find({ userName });

    console.log("📦 Found portfolio:", portfolio);
    res.json(portfolio);
  } catch (error) {
    console.error("❌ Error fetching portfolio:", error.message);
    res.status(500).json({ message: "Error fetching portfolio", error: error.message });
  }
};

// ✅ Delete a stock
const deleteStockFromPortfolio = async (req, res) => {
  try {
    const { userName, symbol } = req.params;
    console.log("🗑️ DELETE /api/portfolio/:userName/:symbol", { userName, symbol });

    const result = await Portfolio.findOneAndDelete({ userName, symbol });

    if (!result) {
      return res.status(404).json({ message: "Stock not found" });
    }

    res.json({ message: "Stock deleted" });
  } catch (error) {
    console.error("❌ Error deleting stock:", error.message);
    res.status(500).json({ message: "Error deleting stock", error: error.message });
  }
};

// ✅ Export
module.exports = {
  savePortfolio,
  saveStockToPortfolio,
  getUserPortfolio,
  deleteStockFromPortfolio,
};
