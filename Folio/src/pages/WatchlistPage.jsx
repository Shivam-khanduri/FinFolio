import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(saved);
  }, []);

  const handleRemove = (symbol) => {
    const updated = watchlist.filter((stock) => stock.symbol !== symbol);
    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">

      <Sidebar />

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Your Watchlist</h1>

        {watchlist.length === 0 ? (
          <p className="text-gray-500">Your watchlist is empty. Add stocks from the Stocks page.</p>
        ) : (
          <div className="space-y-4 max-w-4xl">
            {watchlist.map((stock) => (
              <div key={stock.symbol} className="bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded-xl shadow p-4 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold">{stock.name} ({stock.symbol})</h2>
                  <p className={`font-bold ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${stock.price?.toFixed(2)} ({stock.change >= 0 ? '+' : ''}{stock.change?.toFixed(2)})
                  </p>
                </div>
                <button
                  onClick={() => handleRemove(stock.symbol)}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default WatchlistPage;
