import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, Loader } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader className="animate-spin text-indigo-500" size={48} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Dashboard</h1>
      <p className="text-lg text-gray-600 mb-8">Welcome, {user.email}! You're logged in.</p>
      <button
        onClick={handleLogout}
        className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-colors duration-200"
      >
        <LogOut size={18} />
        <span>Sign Out</span>
      </button>
    </div>
  );
};

export default Dashboard;

