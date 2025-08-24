import React from 'react';
import { useAuth } from './context/AuthContext';
import { LogOut, User, Home as HomeIcon, LogIn } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import { Routes, Route, Link } from "react-router-dom";

const App = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900 flex flex-col">
      {/* Navbar */}
      <header className="w-full bg-white shadow-sm p-4 sticky top-0 z-50">
        <nav className="flex justify-between items-center max-w-screen-xl mx-auto">
          <Link to="/" className="text-2xl font-extrabold text-indigo-600">
            AuthApp
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600 transition-colors">
              <HomeIcon size={18} />
              <span>Home</span>
            </Link>
            <Link to="/dashboard" className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600 transition-colors">
              <User size={18} />
              <span>Dashboard</span>
            </Link>
            {user ? (
              <button
                onClick={logout}
                className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            ) : (
              <Link to="/login" className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600 transition-colors">
                <LogIn size={18} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </nav>
      </header>

      {/* Routes */}
      <main className="flex-grow flex items-center justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Route */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
};

export default App;
