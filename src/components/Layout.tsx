import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Leaf, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <div className="bg-teal-600 p-1.5 rounded-lg">
              <Leaf className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">FoodBridge</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-sm font-medium text-gray-900">{user.name}</span>
                  <span className="text-xs text-teal-600 font-medium">{user.role}</span>
                </div>
                <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700">
                  <UserIcon size={18} />
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center text-gray-500 hover:text-red-600 transition-colors ml-4"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
