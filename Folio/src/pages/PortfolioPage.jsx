import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

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

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const userName = user?.name || "Guest";

  const API_KEY = "d1gkcghr01qn4ub7oiggd1gkcghr01qn4ub7oih0";

  useEffect(() => {
    fetchLivePrices();
    fetchPortfolio();
  }, []);

  useEffect(() => {
    if (location.state?.newStock) {
      const newStock = location.state.newStock;
      setToast(`✅ ${newStock.symbol} added to your portfolio!`);
      setUserPortfolio((prev) => {
        const exists = prev.find((s) => s.symbol === newStock.symbol);
        if (exists) {
          return prev.map((s) =>
            s.symbol === newStock.symbol
              ? {
                  ...s,
                  shares: s.shares + newStock.shares,
                  livePrice: newStock.livePrice,
                }
              : s
          );
        } else {
          return [...prev, newStock];
        }
      });
      setPendingStocks((prev) =>
        prev.filter((s) => s.symbol !== newStock.symbol)
      );
      setTimeout(() => setToast(""), 3000);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  const fetchPortfolio = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/portfolio/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ token added
          },
        }
      );
      setUserPortfolio(res.data);
    } catch (err) {
      console.error("Failed to fetch portfolio", err);
    }
  };

  const fetchLivePrices = async () => {
    try {
      const fetched = await Promise.all(
        stockOptions.map(async (stock) => {
          const res = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=${API_KEY}`
          );
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

  const handleDeletePortfolio = async (symbol) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/portfolio/${userName}/${symbol}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ token added
          },
        }
      );
      fetchPortfolio();
      setToast(`🗑️ ${symbol} removed from portfolio`);
      setTimeout(() => setToast(""), 3000);
    } catch (err) {
      console.error("Failed to delete stock", err);
    }
  };

  const handleSharesChange = (symbol, value) => {
    const shares = Math.max(0, Number(value));
    setSharesMap((prev) => ({ ...prev, [symbol]: shares }));
  };

  const handleAddStock = (stock) => {
    const shares = sharesMap[stock.symbol] || 0;
    if (shares <= 0) return;
    if (pendingStocks.some((s) => s.symbol === stock.symbol)) return;

    const totalValue = (stock.livePrice * shares).toFixed(2);

    setPendingStocks((prev) => [...prev, { ...stock, shares, totalValue }]);
  };

  const handleDeletePending = (symbol) => {
    setPendingStocks((prev) => prev.filter((s) => s.symbol !== symbol));
  };

  const handlePay = (stock) => {
    if (stock.shares <= 0) return;
    navigate("/payment", { state: { stock } });
  };

  const totalPortfolioValue = userPortfolio
    .reduce((acc, s) => acc + s.shares * s.livePrice, 0)
    .toFixed(2);

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

        {/* Portfolio Table */}
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
              {userPortfolio.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No stocks in your portfolio yet.
                  </td>
                </tr>
              )}
              {userPortfolio.map((stock, idx) => (
                <tr key={idx} className="border-t dark:border-gray-700">
                  <td className="p-3">{stock.name}</td>
                  <td className="p-3">{stock.symbol}</td>
                  <td className="p-3">{stock.shares}</td>
                  <td className="p-3">${stock.livePrice.toFixed(2)}</td>
                  <td className="p-3">
                    ${(stock.shares * stock.livePrice).toFixed(2)}
                  </td>
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
            </tbody>
          </table>
        </div>

        {/* Available Stocks */}
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
                    <td className="p-3">${stock.livePrice.toFixed(2)}</td>
                    <td className="p-3">
                      <input
                        type="number"
                        min="0"
                        value={shares}
                        onChange={(e) =>
                          handleSharesChange(stock.symbol, e.target.value)
                        }
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

        {/* Pending Payment */}
        {pendingStocks.length > 0 && (
          <>
            <h2 className="text-3xl font-bold text-blue-600">
              🧾 Pending Payment
            </h2>
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
                      <td className="p-3">${stock.livePrice.toFixed(2)}</td>
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
