import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate, useLocation } from "react-router-dom";

const stockOptions = [
  { name: "Apple Inc", symbol: "AAPL" },
  { name: "Alphabet Inc", symbol: "GOOGL" },
  { name: "Tesla Inc", symbol: "TSLA" },
  { name: "Amazon.com Inc", symbol: "AMZN" },
];

const PortfolioPage = () => {
  const [availableStocks, setAvailableStocks] = useState([]);
  const [sharesMap, setSharesMap] = useState({});
  const [pendingStocks, setPendingStocks] = useState([]);
  const [userPortfolio, setUserPortfolio] = useState([]);
  const [toast, setToast] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const API_KEY = "d1gkcghr01qn4ub7oiggd1gkcghr01qn4ub7oih0"; // replace with your real key

// Existing useEffect that handles location.state and localStorage
useEffect(() => {
  const storedPortfolio = JSON.parse(localStorage.getItem("userPortfolio")) || [];
  setUserPortfolio(storedPortfolio);

  const newStock = location.state?.newStock;

  if (newStock) {
    const alreadyExists = storedPortfolio.some(
      (s) =>
        s.symbol === newStock.symbol &&
        s.shares === newStock.shares &&
        s.livePrice === newStock.livePrice
    );

    if (!alreadyExists) {
      const updated = [...storedPortfolio, newStock];
      localStorage.setItem("userPortfolio", JSON.stringify(updated));
      setUserPortfolio(updated);
      setToast(`✅ ${newStock.symbol} added to your portfolio!`);
      setTimeout(() => setToast(""), 3000);
    }

    // Clear the location.state to prevent re-trigger
    navigate("/portfolio", { replace: true });
  }
}, [location.state, navigate]);

// ✅ ADD THIS to fetch prices
useEffect(() => {
  fetchLivePrices();
}, []);



  const fetchLivePrices = async () => {
    try {
      const fetched = await Promise.all(
        stockOptions.map(async (stock) => {
          const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=${API_KEY}`);
          const data = await res.json();
          return {
            ...stock,
            livePrice: data.c || 0,
          };
        })
      );
      setAvailableStocks(fetched);
    } catch (err) {
      console.error("Live price fetch failed", err);
    }
  };

  const handleSharesChange = (symbol, value) => {
    const shares = Math.max(0, Number(value));
    setSharesMap({ ...sharesMap, [symbol]: shares });
  };

  const handleAddStock = (stock) => {
    const shares = sharesMap[stock.symbol] || 0;
    if (shares === 0) return;
    const existing = pendingStocks.find((s) => s.symbol === stock.symbol);
    if (existing) return;
    const totalValue = (stock.livePrice * shares).toFixed(2);
    setPendingStocks([...pendingStocks, { ...stock, shares, totalValue }]);
  };

  const handleDeletePending = (symbol) => {
    setPendingStocks(pendingStocks.filter((s) => s.symbol !== symbol));
  };

  const handleDeletePortfolio = (symbol) => {
    const updated = userPortfolio.filter((s) => s.symbol !== symbol);
    setUserPortfolio(updated);
    localStorage.setItem("userPortfolio", JSON.stringify(updated));
    setToast(`🗑️ ${symbol} removed from portfolio`);
    setTimeout(() => setToast(""), 3000);
  };

  const handlePay = (stock) => {
    navigate("/payment", { state: { stock } });
  };

  const totalPortfolioValue = userPortfolio.reduce((acc, s) => acc + s.shares * s.livePrice, 0).toFixed(2);

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 text-gray-800 dark:text-white space-y-10">
        <h2 className="text-3xl font-bold text-blue-600">📊 Your Portfolio</h2>
        <p className="text-lg font-medium text-green-600 mb-2">
          Total Value: ${totalPortfolioValue}
        </p>
        {toast && (
          <div className="bg-green-100 text-green-700 p-2 px-4 rounded shadow max-w-xs">
            {toast}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full border dark:border-gray-700">
            <thead className="bg-blue-100 dark:bg-gray-700 text-sm text-left">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Symbol</th>
                <th className="p-3">Shares</th>
                <th className="p-3">Live Price ($)</th>
                <th className="p-3">Total ($)</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userPortfolio.map((stock, idx) => (
                <tr key={idx} className="border-t dark:border-gray-700">
                  <td className="p-3">{stock.name}</td>
                  <td className="p-3">{stock.symbol}</td>
                  <td className="p-3">{stock.shares}</td>
                  <td className="p-3">{stock.livePrice}</td>
                  <td className="p-3">{(stock.shares * stock.livePrice).toFixed(2)}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDeletePortfolio(stock.symbol)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {userPortfolio.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No stocks in your portfolio yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <h2 className="text-3xl font-bold text-blue-600">📈 Available Stocks</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border dark:border-gray-700">
            <thead className="bg-blue-100 dark:bg-gray-700 text-sm text-left">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Symbol</th>
                <th className="p-3">Live Price</th>
                <th className="p-3">Shares</th>
                <th className="p-3">Total</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {availableStocks.map((stock) => {
                const shares = sharesMap[stock.symbol] || 0;
                const total = (shares * stock.livePrice).toFixed(2);
                return (
                  <tr key={stock.symbol} className="border-t dark:border-gray-700">
                    <td className="p-3">{stock.name}</td>
                    <td className="p-3">{stock.symbol}</td>
                    <td className="p-3">${stock.livePrice}</td>
                    <td className="p-3">
                      <input
                        type="number"
                        min="0"
                        value={shares}
                        onChange={(e) => handleSharesChange(stock.symbol, e.target.value)}
                        className="w-20 p-1 border rounded dark:bg-gray-700"
                      />
                    </td>
                    <td className="p-3">${total}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleAddStock(stock)}
                        disabled={shares === 0}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {pendingStocks.length > 0 && (
          <>
            <h2 className="text-3xl font-bold text-blue-600">🧾 Pending Payment</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border dark:border-gray-700">
                <thead className="bg-blue-100 dark:bg-gray-700 text-sm text-left">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Symbol</th>
                    <th className="p-3">Shares</th>
                    <th className="p-3">Live Price</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingStocks.map((stock, idx) => (
                    <tr key={idx} className="border-t dark:border-gray-700">
                      <td className="p-3">{stock.name}</td>
                      <td className="p-3">{stock.symbol}</td>
                      <td className="p-3">{stock.shares}</td>
                      <td className="p-3">${stock.livePrice}</td>
                      <td className="p-3">${stock.totalValue}</td>
                      <td className="p-3 flex space-x-2">
                        <button
                          onClick={() => handleDeletePending(stock.symbol)}
                          className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handlePay(stock)}
                          disabled={stock.shares === 0}
                          className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                        >
                          Pay
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;
