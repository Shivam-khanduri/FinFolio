import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import StocksPage from './pages/StocksPage';
import PrivateRoute from './utils/PrivateRoute';
import ThemeProvider from './context/ThemeContext';
import PortfolioPage from './pages/PortfolioPage';
import WatchlistPage from './pages/WatchlistPage';


const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<PrivateRoute element={<DashboardPage />} />} />
          <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} />
          <Route path="/stocks" element={<PrivateRoute element={<StocksPage />} />} />
          <Route path="/portfolio" element={<PrivateRoute element={<PortfolioPage />} />} />
          <Route path="/watchlist" element={<PrivateRoute element={<WatchlistPage />} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
