import React from 'react';
import Navbar from '../components/Navbar';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
      <Navbar />

      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

        {/* Grid Layout for Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Portfolio Summary Card */}
          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Portfolio Value</h2>
            <p className="text-2xl font-bold text-blue-600">$12,540.00</p>
          </div>

          {/* Profit/Loss Card */}
          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Today's Profit/Loss</h2>
            <p className="text-2xl font-bold text-green-500">+$220.50</p>
          </div>

          {/* Watchlist Summary Card */}
          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Watchlist Items</h2>
            <p className="text-2xl font-bold text-gray-800">5</p>
          </div>

        </div>

        {/* Placeholder for Future Charts */}
        <div className="mt-8 bg-white shadow rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Portfolio Performance (Coming Soon)</h2>
          <div className="h-48 flex items-center justify-center text-gray-400">
            Chart Component Placeholder
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
