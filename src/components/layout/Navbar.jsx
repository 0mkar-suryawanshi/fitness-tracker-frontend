import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <span className="text-2xl">🏃</span>
              <span className="font-bold text-xl text-gray-800">Fitness Tracker</span>
            </Link>
          </div>

          {/* Navigation Links - Only show when authenticated */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                to="/dashboard" 
                className="text-gray-600 hover:text-blue-600 transition duration-300"
              >
                Dashboard
              </Link>
              <Link 
                to="/activities" 
                className="text-gray-600 hover:text-blue-600 transition duration-300"
              >
                Activities
              </Link>
              <Link 
                to="/recommendations" 
                className="text-gray-600 hover:text-blue-600 transition duration-300"
              >
                Recommendations
              </Link>
              <Link 
                to="/profile" 
                className="text-gray-600 hover:text-blue-600 transition duration-300"
              >
                Profile
              </Link>
            </div>
          )}

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                    </span>
                  </div>
                  <span className="text-gray-700 hidden md:inline">
                    {user?.firstName} {user?.lastName}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300 text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-blue-600 transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Button - Optional */}
      {isAuthenticated && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-4 py-2 space-y-1">
            <Link 
              to="/dashboard" 
              className="block py-2 text-gray-600 hover:text-blue-600 transition"
            >
              Dashboard
            </Link>
            <Link 
              to="/activities" 
              className="block py-2 text-gray-600 hover:text-blue-600 transition"
            >
              Activities
            </Link>
            <Link 
              to="/recommendations" 
              className="block py-2 text-gray-600 hover:text-blue-600 transition"
            >
              Recommendations
            </Link>
            <Link 
              to="/profile" 
              className="block py-2 text-gray-600 hover:text-blue-600 transition"
            >
              Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;