import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
      <Link to="/dashboard" className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default Home;

