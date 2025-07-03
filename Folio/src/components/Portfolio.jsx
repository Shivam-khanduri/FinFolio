import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Notification from "../components/Notification";

const Portfolio = () => {
  const [stocks, setStocks] = useState([]);
  const [form, setForm] = useState({ symbol: "", shares: "", price: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [alert, setAlert] = useState({ message: "", type: "success" });
  const [watchlistStocks, setWatchlistStocks] = useState([]);

  // ✅ Load user's portfolio holdings from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("portfolio")) || [];
    setStocks(saved);
  }, []);

  // ✅ Save portfolio to localStorage on changes
  useEffect(() => {
    localStorage.setItem("portfolio", JSON.stringify(stocks));
  }, [stocks]);

  // ✅ Load Watchlist from localStorage initially
  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlistStocks(savedWatchlist);
  }, []);

  // ✅ Keep Watchlist refreshed automatically every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const latestWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
      setWatchlistStocks(latestWatchlist);
    }, 5000); // adjust interval as needed

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.symbol.trim() || isNaN(form.shares) || isNaN(form.price)) {
      setAlert({ message: "Please fill in all fields correctly.", type: "error" });
      return;
    }

    const updatedStock = {
      symbol: form.symbol.toUpperCase(),
      shares: parseFloat(form.shares),
      price: parseFloat(form.price),
    };

    let updated;
    if (editingIndex !== null) {
      updated = [...stocks];
      updated[editingIndex] = updatedStock;
      setEditingIndex(null);
      setAlert({ message: "Stock updated successfully!", type: "success" });
    } else {
      updated = [...stocks, updatedStock];
      setAlert({ message: "Stock added successfully!", type: "success" });
    }

    setStocks(updated);
    setForm({ symbol: "", shares: "", price: "" });
  };

  const handleEdit = (index) => {
    setForm(stocks[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updated = stocks.filter((_, i) => i !== index);
    setStocks(updated);
    setAlert({ message: "Stock deleted successfully!", type: "info" });
  };

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
        <h2 className="text-3xl font-bold mb-6 text-blue-600">📊 Your Portfolio</h2>

        <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <input
              type="text"
              name="symbol"
              placeholder="Symbol (e.g. AAPL)"
              value={form.symbol}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
            />
            <input
              type="number"
              name="shares"
              placeholder="Shares"
              value={form.shares}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
            />
            <button
              type="submit"
              className="md:col-span-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {editingIndex !== null ? "Update Stock" : "Add Stock"}
            </button>
          </form>

          {/* ✅ Portfolio Holdings Table */}
          <table className="w-full text-left border">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="p-2 border">Symbol</th>
                <th className="p-2 border">Shares</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Total</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stocks.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    No holdings yet.
                  </td>
                </tr>
              ) : (
                stocks.map((stock, index) => (
                  <tr key={index}>
                    <td className="p-2 border">{stock.symbol}</td>
                    <td className="p-2 border">{stock.shares}</td>
                    <td className="p-2 border">₹{stock.price.toFixed(2)}</td>
                    <td className="p-2 border">₹{(stock.shares * stock.price).toFixed(2)}</td>
                    <td className="p-2 border">
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-blue-600 hover:underline mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* ✅ Watchlist Section */}
          <div className="mt-10">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">📈 Stocks Watchlist</h3>

            {watchlistStocks.length === 0 ? (
              <p className="text-gray-500">
                Your watchlist is empty. Add stocks from the Stocks page.
              </p>
            ) : (
              <table className="w-full text-left border">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Symbol</th>
                    <th className="p-2 border">Price</th>
                    <th className="p-2 border">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {watchlistStocks.map((stock, index) => (
                    <tr key={index}>
                      <td className="p-2 border">{stock.name}</td>
                      <td className="p-2 border">{stock.symbol}</td>
                      <td className="p-2 border">${stock.price?.toFixed(2)}</td>
                      <td
                        className={`p-2 border ${
                          stock.change >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {stock.change >= 0 ? "+" : ""}
                        {stock.change?.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Portfolio;
