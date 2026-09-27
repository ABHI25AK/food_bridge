import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth, mockUsers } from '../contexts/AuthContext';
import type { Role } from '../types';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('pass123'); // Pre-fill for demo
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = login(email, password);
    if (success) {
      const user = mockUsers.find(u => u.email === email);
      if (user?.role === 'Kitchen Admin') navigate('/kitchen');
      else if (user?.role === 'NGO/Receiver') navigate('/ngo');
      else if (user?.role === 'Processing Unit Manager') navigate('/processing');
      else if (user?.role === 'Super Admin') navigate('/admin');
      else navigate('/');
    } else {
      setError('Invalid email or password. Use pass123');
    }
  };

  const handleAutoFill = (mockEmail: string) => {
    setEmail(mockEmail);
    setPassword('pass123');
  };

  const groupUsersByRole = () => {
    const grouped = {} as Record<Role, typeof mockUsers>;
    mockUsers.forEach(user => {
      if (!grouped[user.role]) grouped[user.role] = [];
      grouped[user.role].push(user);
    });
    return grouped;
  };

  const groupedUsers = groupUsersByRole();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-teal-600 p-2 rounded-xl">
            <Leaf className="text-white" size={32} />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to FoodBridge
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Select a mock user below to auto-fill credentials
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm sm:rounded-xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-2.5 border"
                  placeholder="kitchen1@test.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-2.5 border"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Demo Accounts</span>
              </div>
            </div>

            <div className="mt-6 space-y-4 max-h-60 overflow-y-auto pr-2">
              {(Object.keys(groupedUsers) as Role[]).map((role) => (
                <div key={role}>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{role}</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {groupedUsers[role].map(user => (
                      <button
                        key={user.id}
                        type="button"
                        onClick={() => handleAutoFill(user.email)}
                        className="w-full inline-flex justify-between items-center px-3 py-2 border border-gray-200 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <span className="truncate">{user.name}</span>
                        <span className="text-xs text-teal-600">{user.email}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
