const express = require("express");
const router = express.Router();
const {
  getPortfolio,
  addStock,
  deleteStock
} = require("../controllers/portfolio.controller.cjs");

router.get("/:userName", getPortfolio);
router.post("/", addStock);
router.delete("/:userName/:symbol", deleteStock);

module.exports = router;
