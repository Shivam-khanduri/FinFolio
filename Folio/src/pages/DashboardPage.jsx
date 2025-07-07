import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,
  BarChart, Bar, ResponsiveContainer,
} from 'recharts';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [watchlistCount, setWatchlistCount] = useState(0);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlistCount(saved.length);
  }, []);

  // Dummy chart data
  const lineChartData = [
    { date: 'Mon', price: 125 },
    { date: 'Tue', price: 132 },
    { date: 'Wed', price: 128 },
    { date: 'Thu', price: 138 },
    { date: 'Fri', price: 142 },
  ];

  const barChartData = [
    { day: 'Mon', change: 10 },
    { day: 'Tue', change: -5 },
    { day: 'Wed', change: 7 },
    { day: 'Thu', change: 12 },
    { day: 'Fri', change: -3 },
  ];

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
          <div
            className="bg-white dark:bg-gray-800 shadow rounded-2xl p-6 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => navigate('/watchlist')}
          >
            <h2 className="text-xl font-semibold mb-2">Watchlist Items</h2>
            <p className="text-2xl font-bold">{watchlistCount}</p>
          </div>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 shadow rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Portfolio Performance</h2>
          
          {/* Line Chart */}
          <div className="mb-8 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke="#8884d8" />
                <YAxis stroke="#8884d8" />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#4f46e5" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="#8884d8" />
                <YAxis stroke="#8884d8" />
                <Tooltip />
                <Bar dataKey="change" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
