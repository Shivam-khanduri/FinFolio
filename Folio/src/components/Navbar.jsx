import { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { FaSun, FaMoon, FaSearch, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const topGainers = [
  'RattanIndia Power Ltd.',
  'Suzlon Energy Ltd.',
  'Waaree Energies Ltd.',
];

const topLosers = [
  'Raymond Ltd.',
  'JIO Financial Services Ltd.',
  'Reliance Power Ltd.',
];

const Navbar = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate(0);
  };

  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 shadow-sm bg-white dark:bg-gray-800 dark:text-white">
      <div className="flex items-center space-x-4 w-full md:w-auto">
        <h1 className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate('/')}>
          FinFolio
        </h1>

        {/* Search Bar */}
        <div className="relative w-full md:w-96 mt-4 md:mt-0">
          <div className="flex items-center border rounded-xl px-3 py-2 bg-gray-100 dark:bg-gray-700">
            <FaSearch className="text-gray-500 dark:text-gray-300 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              placeholder="Search FinFolio..."
              className="bg-transparent w-full focus:outline-none"
            />
          </div>

          {showSuggestions && searchQuery.trim() !== '' && (
            <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-10 max-h-72 overflow-y-auto p-4">
              <div className="mb-2 font-semibold text-gray-700 dark:text-gray-200">Top Gainers</div>
              <ul className="mb-4">
                {topGainers.map((stock, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-green-600 dark:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded cursor-pointer">
                    <FaArrowUp /> {stock}
                  </li>
                ))}
              </ul>

              <div className="mb-2 font-semibold text-gray-700 dark:text-gray-200">Top Losers</div>
              <ul>
                {topLosers.map((stock, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded cursor-pointer">
                    <FaArrowDown /> {stock}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Nav Buttons */}
      <nav className="space-x-4 flex items-center mt-4 md:mt-0">
        <button
          onClick={() => setTheme(theme === 'Light' ? 'Dark' : 'Light')}
          className="p-2 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {theme === 'Light' ? <FaMoon /> : <FaSun />}
        </button>

        {isLoggedIn ? (
          <>
            <button onClick={() => navigate('/dashboard')} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">Dashboard</button>
            <button onClick={() => navigate('/profile')} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">Profile</button>
            <button onClick={handleLogout} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">Logout</button>
          </>
        ) : (
          <button onClick={() => navigate('/login')} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">Login</button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
