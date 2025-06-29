import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center p-6 shadow-sm bg-white">
      <h1 
        className="text-2xl font-bold text-blue-600 cursor-pointer"
        onClick={() => navigate('/')}
      >
        FinFolio
      </h1>

      <nav className="space-x-4 flex items-center">
        
        <button 
          className="text-gray-700 hover:text-blue-600"
          onClick={() => navigate('/')}
        >
          Home
        </button>

        <button
          onClick={() => navigate('/dashboard')}
          className="text-gray-700 hover:text-blue-600"
        >
          Dashboard
        </button>

        <button
          onClick={() => navigate('/stocks')}
          className="text-gray-700 hover:text-blue-600"
        >
          Stocks
        </button>

        <button
          onClick={() => navigate('/signup')}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
