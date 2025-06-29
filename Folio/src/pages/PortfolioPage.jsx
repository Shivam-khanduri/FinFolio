import React from 'react';
import Portfolio from '../components/Portfolio'; // assuming you saved it here

const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">📈 Portfolio Tracker</h1>
      <Portfolio />
    </div>
  );
};

export default PortfolioPage;
