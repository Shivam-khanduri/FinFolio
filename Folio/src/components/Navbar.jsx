import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useContext(ThemeContext);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate(0);
  };

  return (
    <header className="flex justify-between items-center p-6 shadow-sm bg-white dark:bg-gray-800 dark:text-white">
      <h1 
        className="text-2xl font-bold text-blue-600 cursor-pointer"
        onClick={() => navigate('/')}
      >
        FinFolio
      </h1>

      <nav className="space-x-4 flex items-center">
        <button 
          onClick={() => setTheme(theme === 'Light' ? 'Dark' : 'Light')}
          className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 dark:text-white rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {theme === 'Light' ? 'Dark Mode' : 'Light Mode'}
        </button>

        {isLoggedIn ? (
          <>
            <button onClick={() => navigate('/dashboard')} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">Dashboard</button>
            <button onClick={() => navigate('/profile')} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">Profile</button>
            <button onClick={handleLogout} className="px-4 py-2 text-sm bg-gray-300 dark:bg-gray-600 dark:text-white text-gray-700 rounded-xl hover:bg-gray-400 dark:hover:bg-gray-500 transition">Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">Login</button>
            <button onClick={() => navigate('/signup')} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">Sign Up</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
