import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Card, CardContent } from '../components/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    setUser(storedUser);

    const fetchPortfolio = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/portfolio/${storedUser.name}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setPortfolio(data);
      } catch (err) {
        console.error('Failed to load portfolio', err);
      }
    };

    if (storedUser) {
      fetchPortfolio();
    }
  }, []);

  // Metrics
  const totalInvestment = portfolio.reduce(
    (acc, stock) => acc + stock.shares * stock.avgPrice,
    0
  );
  const totalCurrentValue = portfolio.reduce(
    (acc, stock) => acc + stock.shares * stock.livePrice,
    0
  );
  const monthlyGain = totalCurrentValue - totalInvestment;

  const chartData = portfolio.map((stock) => ({
    name: stock.symbol,
    value: Math.round(stock.shares * stock.livePrice),
  }));

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <Sidebar />

      <main className="flex-1 p-6 space-y-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-blue-600">📊 Dashboard</h1>
          {user && (
            <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
              Welcome back, <span className="font-semibold">{user.name}</span>!
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-lg hover:shadow-xl transition">
            <CardContent>
              <h3 className="text-xl font-bold mb-2 text-green-600">Total Investments</h3>
              <p className="text-3xl font-semibold">₹{totalCurrentValue.toFixed(2)}</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition">
            <CardContent>
              <h3 className="text-xl font-bold mb-2 text-purple-600">Monthly Gain</h3>
              <p className="text-3xl font-semibold">₹{monthlyGain.toFixed(2)}</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition">
            <CardContent>
              <h3 className="text-xl font-bold mb-2 text-red-600">Stocks Owned</h3>
              <p className="text-3xl font-semibold">{portfolio.length}</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">📈 Top Stocks Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
};

 export default DashboardPage;
