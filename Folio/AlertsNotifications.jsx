import React, { useState, useEffect } from "react";

export default function AlertsNotifications() {
  // State for alerts
  const [alerts, setAlerts] = useState([
    { id: 1, symbol: "AAPL", targetPrice: 150 },
  ]);

  // State for notifications
  const [notifications, setNotifications] = useState([
    { id: 1, message: "AAPL reached $150", date: new Date().toLocaleString() },
  ]);

  // Form state
  const [symbol, setSymbol] = useState("");
  const [targetPrice, setTargetPrice] = useState("");

  // Add new alert
  const handleAddAlert = (e) => {
    e.preventDefault();

    if (!symbol.trim() || !targetPrice) {
      alert("Please fill all fields correctly.");
      return;
    }

    const price = parseFloat(targetPrice);
    if (isNaN(price) || price <= 0) {
      alert("Target price must be a valid number greater than 0.");
      return;
    }

    const newAlert = {
      id: Date.now(),
      symbol: symbol.trim().toUpperCase(),
      targetPrice: price,
    };

    setAlerts((prev) => [...prev, newAlert]);
    setSymbol("");
    setTargetPrice("");
  };

  // Delete alert
  const handleDeleteAlert = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  // Simulate incoming notifications every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (alerts.length === 0) return;

      const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
      const newNotification = {
        id: Date.now(),
        message: `${randomAlert.symbol} hit target price of $${randomAlert.targetPrice.toFixed(2)}`,
        date: new Date().toLocaleString(),
      };

      setNotifications((prev) => [newNotification, ...prev]);
    }, 30000);

    return () => clearInterval(interval);
  }, [alerts]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Alerts & Notifications</h1>

      {/* Add Alert Form */}
      <form
        onSubmit={handleAddAlert}
        className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center"
      >
        <input
          type="text"
          placeholder="Stock Symbol (e.g., AAPL)"
          className="border rounded px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          maxLength={5}
          required
        />
        <input
          type="number"
          placeholder="Target Price"
          className="border rounded px-4 py-2 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={targetPrice}
          onChange={(e) => setTargetPrice(e.target.value)}
          min="0"
          step="0.01"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Alert
        </button>
      </form>

      {/* Alerts List */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Your Price Alerts</h2>
        {alerts.length === 0 ? (
          <p className="text-gray-500">No alerts set. Add some!</p>
        ) : (
          <ul className="space-y-3">
            {alerts.map(({ id, symbol, targetPrice }) => (
              <li
                key={id}
                className="flex justify-between items-center border rounded p-3 bg-gray-50"
              >
                <div>
                  <span className="font-semibold">{symbol}</span> target price:{" "}
                  <span className="text-green-600 font-semibold">${targetPrice.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => handleDeleteAlert(id)}
                  className="text-red-500 hover:text-red-700 font-bold text-lg"
                  aria-label={`Delete alert for ${symbol}`}
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Notifications List */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
        {notifications.length === 0 ? (
          <p className="text-gray-500">No notifications yet.</p>
        ) : (
          <ul className="space-y-2 max-h-64 overflow-y-auto border rounded p-4 bg-white shadow-inner">
            {notifications.map(({ id, message, date }) => (
              <li key={id} className="border-b last:border-b-0 pb-2 mb-2">
                <p>{message}</p>
                <small className="text-gray-400">{date}</small>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
