import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Portfolio from '../components/Portfolio';

const symbolsToMerge = ['AAPL', 'GOOGL', 'TSLA', 'AMZN', 'NFLX'];

const PortfolioPage = () => {
  const navigate = useNavigate();

  const [selectedStock, setSelectedStock] = useState(null);

  // Handle Pay button click from Portfolio component
  const handlePay = (stockData) => {
    setSelectedStock(stockData);
    navigate('/payment', { state: { stock: stockData } });
  };

  return (
    <div className="">
      <Portfolio mergeSymbols={symbolsToMerge} onPay={handlePay} />

      {/* Global Pay Button (optional) */}
      {selectedStock && (
        <div className="mt-6 text-center">
          <button
            onClick={() => handlePay(selectedStock)}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Pay for {selectedStock.symbol}
          </button>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
