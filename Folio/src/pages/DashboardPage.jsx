import React from 'react';
import Sidebar from '../components/Sidebar';

const DashboardPage = () => {
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      
      <Sidebar />

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-2">Total Portfolio Value</h2>
            <p className="text-2xl font-bold text-blue-600">$12,540.00</p>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-2">Today's Profit/Loss</h2>
            <p className="text-2xl font-bold text-green-500">+$220.50</p>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-2">Watchlist Items</h2>
            <p className="text-2xl font-bold">5</p>
          </div>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 shadow rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Portfolio Performance (Coming Soon)</h2>
          <div className="h-48 flex items-center justify-center text-gray-400">Chart Component Placeholder</div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
