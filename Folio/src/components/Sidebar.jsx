import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-blue-600 text-white flex flex-col p-6 space-y-6 min-h-screen">
      <h2 className="text-2xl font-bold">FinFolio</h2>
      <nav className="flex flex-col space-y-4">
        <button onClick={() => navigate('/')} className="text-left hover:bg-blue-700 p-2 rounded">Home</button>
        <button onClick={() => navigate('/dashboard')} className="text-left hover:bg-blue-700 p-2 rounded">Dashboard</button>
        <button onClick={() => navigate('/portfolio')} className="text-left hover:bg-blue-700 p-2 rounded">Portfolio</button>
        <button onClick={() => navigate('/stocks')} className="text-left hover:bg-blue-700 p-2 rounded">Stocks</button>
        <button onClick={() => navigate('/profile')} className="text-left hover:bg-blue-700 p-2 rounded">Profile</button>
        <button onClick={() => { localStorage.removeItem("isLoggedIn"); navigate('/'); }} className="text-left hover:bg-blue-700 p-2 rounded">Logout</button>
      </nav>
    </aside>
  );
};

export default Sidebar;
