import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-gray-100 flex flex-col">
      
      <Navbar />

      <div className="flex flex-1 items-center justify-center px-4">
        <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 space-y-6">
          
          <h2 className="text-3xl font-bold text-center text-blue-600">Welcome Back</h2>
          <p className="text-center text-gray-500">Log in to your FinFolio account</p>

          <form className="space-y-4">
            
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                placeholder="you@example.com" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
            >
              Log In
            </button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <span 
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </span>
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
