import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const LoginPage = () => {
  const navigate = useNavigate();
  const DUMMY_EMAIL = "user@gmail.com";
  const DUMMY_PASSWORD = "password123";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === DUMMY_EMAIL && password === DUMMY_PASSWORD) {
      localStorage.setItem("isLoggedIn", "true");
      navigate('/dashboard');
    } else {
      setLoginError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 space-y-6">
          <h2 className="text-3xl font-bold text-center text-blue-600">Welcome Back</h2>
          <p className="text-center text-gray-500 dark:text-gray-400">Log in to your FinFolio account</p>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block mb-1">Email</label>
              <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="block mb-1">Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700">Log In</button>
          </form>
          {loginError && (
            <p className="text-center text-red-500 text-sm">{loginError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
