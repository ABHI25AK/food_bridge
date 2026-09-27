import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import type { Role } from '../types';
import RoleSwitcher from './RoleSwitcher';
import { Leaf } from 'lucide-react';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState<Role | null>(() => {
    if (location.pathname.includes('/kitchen')) return 'Kitchen Admin';
    if (location.pathname.includes('/ngo')) return 'NGO/Receiver';
    if (location.pathname.includes('/processing')) return 'Processing Unit Manager';
    if (location.pathname.includes('/admin')) return 'Super Admin';
    return null;
  });

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    switch (newRole) {
      case 'Kitchen Admin':
        navigate('/kitchen');
        break;
      case 'NGO/Receiver':
        navigate('/ngo');
        break;
      case 'Processing Unit Manager':
        navigate('/processing');
        break;
      case 'Super Admin':
        navigate('/admin');
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => { setRole(null); navigate('/'); }}
          >
            <div className="bg-teal-600 p-1.5 rounded-lg">
              <Leaf className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">FoodBridge</span>
          </div>
          <div className="flex items-center space-x-4">
            <RoleSwitcher currentRole={role} onRoleChange={handleRoleChange} />
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
