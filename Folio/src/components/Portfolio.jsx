import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Notification from "../components/Notification";

const API_KEY = 'd1gkcghr01qn4ub7oiggd1gkcghr01qn4ub7oih0';

const stockOptions = [
  { name: "Apple Inc", symbol: "AAPL" },
  { name: "Alphabet Inc", symbol: "GOOGL" },
  { name: "Tesla Inc", symbol: "TSLA" },
  { name: "Amazon.com Inc", symbol: "AMZN" },
  { name: "Netflix Inc", symbol: "NFLX" },
];

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState({});
  const [liveData, setLiveData] = useState([]);
  const [alert, setAlert] = useState({ message: "", type: "success" });
  const [newStock, setNewStock] = useState({ name: '', symbol: '', shares: '', price: '' });
  const [formError, setFormError] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("portfolio")) || {};
    setPortfolio(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("portfolio", JSON.stringify(portfolio));
  }, [portfolio]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Promise.all(
          stockOptions.map(async ({ symbol, name }) => {
            const [profileRes, quoteRes] = await Promise.all([
              fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${API_KEY}`),
              fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`),
            ]);
            const profile = await profileRes.json();
            const quote = await quoteRes.json();
            return {
              symbol,
              name: profile.name || name || symbol,
              livePrice: quote.c,
              change: quote.d,
            };
          })
        );
        setLiveData(data);
      } catch (err) {
        console.error("Failed to fetch live prices", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const updateShares = (symbol, value) => {
    setPortfolio((prev) => ({
      ...prev,
      [symbol]: {
        shares: parseFloat(value) || 0,
      },
    }));
  };

  const handleDelete = (symbol) => {
    const confirmDelete = window.confirm(`Are you sure you want to remove ${symbol} from your portfolio?`);
    if (!confirmDelete) return;

    const updated = { ...portfolio };
    delete updated[symbol];
    setPortfolio(updated);
    setAlert({ message: `${symbol} removed from portfolio`, type: "info" });
    setTimeout(() => setAlert({ message: "", type: "success" }), 3000);
  };

  const handlePay = (symbol) => {
    const confirmPay = window.confirm(`Are you sure you want to proceed with payment for ${symbol}?`);
    if (!confirmPay) return;

    alert(`Payment initiated for ${symbol}`);
  };

  const handleNameChange = (e) => {
    const input = e.target.value;
    setNewStock({ ...newStock, name: input, symbol: '', price: '' });

    const matches = stockOptions.filter((stock) =>
      stock.name.toLowerCase().includes(input.toLowerCase())
    );
    setSuggestions(input ? matches : []);
  };

  const handleSuggestionClick = async (stock) => {
    try {
      const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=${API_KEY}`);
      const data = await res.json();

      setNewStock({
        name: stock.name,
        symbol: stock.symbol,
        shares: '',
        price: data.c.toFixed(2),
      });
      setSuggestions([]);
      setFormError('');
    } catch {
      setFormError("Failed to fetch live price.");
    }
  };

  const handleAddStock = async () => {
    const { symbol, shares, price } = newStock;
    setFormError('');

    if (!symbol || !shares || !price) {
      setFormError("All fields are required.");
      return;
    }

    try {
      const res = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${API_KEY}`);
      const data = await res.json();

      if (!data.name) {
        setFormError("Invalid stock symbol. Please check and try again.");
        return;
      }

      setPortfolio((prev) => ({
        ...prev,
        [symbol]: {
          shares: parseFloat(shares) || 0,
        },
      }));

      setLiveData((prev) => [
        ...prev,
        {
          symbol,
          name: data.name,
          livePrice: parseFloat(price) || 0,
          change: 0,
        },
      ]);

      setNewStock({ name: '', symbol: '', shares: '', price: '' });
      setAlert({ message: `${symbol} added to portfolio`, type: "success" });
      setTimeout(() => setAlert({ message: "", type: "success" }), 3000);
    } catch (err) {
      console.error(err);
      setFormError("Error validating stock. Please try again later.");
    }
  };

  const totalPortfolioValue = liveData.reduce((sum, stock) => {
    const shares = portfolio[stock.symbol]?.shares || 0;
    return sum + shares * stock.livePrice;
  }, 0);

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      {alert.message && (
        <Notification
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ message: "", type: "success" })}
        />
      )}

      <Sidebar />

      <main className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-2 text-blue-600">📊 Your Portfolio</h2>

        <p className="text-xl font-bold text-green-600 mb-6">
          💰 Total Portfolio Value: ₹{totalPortfolioValue.toFixed(2)}
        </p>

        {/* Stock Add Form */}
        <div className="max-w-5xl mx-auto mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search stock name (e.g. Apple)"
                value={newStock.name}
                onChange={handleNameChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 dark:bg-gray-700"
              />
              {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border rounded shadow dark:bg-gray-800 max-h-48 overflow-y-auto">
                  {suggestions.map((stock) => (
                    <li
                      key={stock.symbol}
                      onClick={() => handleSuggestionClick(stock)}
                      className="px-3 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      {stock.name} ({stock.symbol})
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <input
              type="number"
              placeholder="Shares"
              value={newStock.shares}
              onChange={(e) => setNewStock({ ...newStock, shares: e.target.value })}
              className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 dark:bg-gray-700"
            />
            <input
              type="number"
              placeholder="Price"
              value={newStock.price}
              onChange={(e) => setNewStock({ ...newStock, price: e.target.value })}
              className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 dark:bg-gray-700"
            />
          </div>
          <button
            onClick={handleAddStock}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Add Stock
          </button>
          {formError && (
            <p className="text-red-600 text-sm">{formError}</p>
          )}
        </div>

        {/* Portfolio Table */}
        <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-x-auto">
          <table className="w-full text-left border mb-6">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 border font-bold uppercase">Symbol</th>
                <th className="p-3 border font-bold uppercase">Name</th>
                <th className="p-3 border font-bold uppercase">Shares</th>
                <th className="p-3 border font-bold uppercase">Live Price</th>
                <th className="p-3 border font-bold uppercase">Total</th>
                <th className="p-3 border font-bold uppercase">Actions</th>
                <th className="p-3 border font-bold uppercase">Payment</th>
              </tr>
            </thead>
            <tbody>
              {liveData.map((stock) => {
                const { symbol, name, livePrice } = stock;
                const shares = portfolio[symbol]?.shares || 0;
                const total = shares * livePrice;

                return (
                  <tr key={symbol}>
                    <td className="p-2 border">{symbol}</td>
                    <td className="p-2 border">{name}</td>
                    <td className="p-2 border">
                      <input
                        type="number"
                        value={shares}
                        onChange={(e) => updateShares(symbol, e.target.value)}
                        className="w-20 px-2 py-1 rounded bg-gray-100 dark:bg-gray-700"
                      />
                    </td>
                    <td className="p-2 border text-blue-600 font-semibold">
                      ₹{livePrice?.toFixed(2)}
                    </td>
                    <td className="p-2 border">₹{total.toFixed(2)}</td>
                    <td className="p-2 border">
                      <button
                        onClick={() => handleDelete(symbol)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                    <td className="p-2 border">
                      <button
                        onClick={() => handlePay(symbol)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                      >
                        Pay
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="text-sm text-gray-500">Edit shares. Total is based on live price.</p>
        </div>
      </main>
    </div>
  );
};

export default Portfolio;
