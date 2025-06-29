import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white flex flex-col p-6 space-y-6">
        <h2 className="text-2xl font-bold">FinFolio</h2>
        <nav className="flex flex-col space-y-4">
          <button onClick={() => navigate('/dashboard')} className="text-left hover:bg-blue-700 p-2 rounded">Dashboard</button>
          <button onClick={() => navigate('/')} className="text-left hover:bg-blue-700 p-2 rounded">Home</button>
          <button onClick={() => { localStorage.removeItem("isLoggedIn"); navigate('/'); }} className="text-left hover:bg-blue-700 p-2 rounded">Logout</button>
          <button onClick={() => navigate('/portfolio')} className="text-left hover:bg-blue-700 p-2 rounded">Portfolio</button>
        </nav>
      </aside>

      {/* Main Content */}
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
