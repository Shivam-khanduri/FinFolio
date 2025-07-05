import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

const API_KEY = 'd1gkcghr01qn4ub7oiggd1gkcghr01qn4ub7oih0';
const SYMBOLS = ['AAPL', 'GOOGL', 'TSLA', 'AMZN', 'NFLX'];

const StocksPage = () => {
  const [stocks, setStocks] = useState([]);
  const [clickedStocks, setClickedStocks] = useState([]);

  // ✅ Fetch stock data from Finnhub
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const allData = await Promise.all(SYMBOLS.map(async (symbol) => {
          const [profileRes, quoteRes] = await Promise.all([
            fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${API_KEY}`),
            fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`),
          ]);
          const profile = await profileRes.json();
          const quote = await quoteRes.json();
          return { symbol, name: profile.name || symbol, price: quote.c, change: quote.d };
        }));
        setStocks(allData);
      } catch (err) {
        console.error('Error fetching stock data:', err);
      }
    };

    const saved = JSON.parse(localStorage.getItem('watchlist')) || [];
    setClickedStocks(saved.map(s => s.symbol));
    fetchStocks();
  }, []);

  // ✅ Add stock to watchlist when button clicked
  const addToWatchlist = (symbol) => {
    const updatedClicked = [...clickedStocks, symbol];
    setClickedStocks(updatedClicked);

    const saved = JSON.parse(localStorage.getItem('watchlist')) || [];
    const stockToAdd = stocks.find((s) => s.symbol === symbol);

    if (stockToAdd && !saved.find((s) => s.symbol === symbol)) {
      const updated = [...saved, stockToAdd];
      localStorage.setItem('watchlist', JSON.stringify(updated));
    }
  };

  // ✅ NEW - Keep watchlist in localStorage updated with latest prices
  useEffect(() => {
    const updatedWatchlist = stocks.filter((s) => clickedStocks.includes(s.symbol));
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
  }, [stocks, clickedStocks]);

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <Sidebar />

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Stocks</h1>
        
        <div className="space-y-4 max-w-4xl">
          {stocks.map((stock) => {
            const isClicked = clickedStocks.includes(stock.symbol);
            return (
              <div key={stock.symbol} className="bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded-xl shadow p-4 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold">{stock.name} ({stock.symbol})</h2>
                  <p className={`font-bold ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${stock.price?.toFixed(2)} ({stock.change >= 0 ? '+' : ''}{stock.change?.toFixed(2)})
                  </p>
                </div>
                <button
                  disabled={isClicked}
                  onClick={() => addToWatchlist(stock.symbol)}
                  className={`px-4 py-2 rounded-lg transition ${isClicked ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                >
                  {isClicked ? 'Added' : 'Add to Watchlist'}
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default StocksPage;
