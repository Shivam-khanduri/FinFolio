import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const Portfolio = () => {
  const [stocks, setStocks] = useState([]);
  const [form, setForm] = useState({ symbol: "", shares: "", price: "" });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedStock = {
      symbol: form.symbol.toUpperCase(),
      shares: parseFloat(form.shares),
      price: parseFloat(form.price),
    };

    if (editingIndex !== null) {
      const updated = [...stocks];
      updated[editingIndex] = updatedStock;
      setStocks(updated);
      setEditingIndex(null);
    } else {
      setStocks([...stocks, updatedStock]);
    }

    setForm({ symbol: "", shares: "", price: "" });
  };

  const handleEdit = (index) => {
    setForm(stocks[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setStocks(stocks.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">

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
                    <td className="p-2 border">${stock.price.toFixed(2)}</td>
                    <td className="p-2 border">${(stock.shares * stock.price).toFixed(2)}</td>
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
        </div>
      </main>
    </div>
  );
};

export default Portfolio;
