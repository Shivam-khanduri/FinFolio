import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const SignupPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white flex flex-col">
      
      <Navbar />

      <div className="flex flex-1 items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 space-y-6">
          
          <h2 className="text-3xl font-bold text-center text-blue-600">Create Account</h2>
          <p className="text-center text-gray-500 dark:text-gray-400">Sign up to start using FinFolio</p>

          <form className="space-y-4">
            
            <div>
              <label className="block mb-1">Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block mb-1">Email</label>
              <input 
                type="email" 
                placeholder="you@example.com" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block mb-1">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <span 
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate('/login')}
            >
              Log In
            </span>
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
