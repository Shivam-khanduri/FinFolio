import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setLoginError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setLoginError('Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 space-y-6">
          <h2 className="text-3xl font-bold text-center text-blue-600">Welcome Back</h2>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
              />
            </div>
            <div>
              <label className="block mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Log In</button>
          </form>
          {loginError && <p className="text-red-500 text-center">{loginError}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
  