import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Mail, Lock, AlertCircle, ArrowLeft, Utensils, Heart, Activity, ShieldCheck } from 'lucide-react';
import { useAuth, mockUsers } from '../contexts/AuthContext';
import type { Role } from '../types';

const Login: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('pass123');
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = login(email, password);
    if (success) {
      const user = mockUsers.find(u => u.email === email);
      if (user?.role !== selectedRole) {
         // This theoretically shouldn't happen if they click the demo users, but just in case
         setError(`This account does not belong to the ${selectedRole} role.`);
         return;
      }
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

  // Get users only for the selected role
  const roleUsers = selectedRole ? mockUsers.filter(u => u.role === selectedRole) : [];

  const roles = [
    { name: 'Kitchen Admin' as Role, icon: Utensils, description: 'Manage food surplus & daily meals' },
    { name: 'NGO/Receiver' as Role, icon: Heart, description: 'Accept & coordinate donations' },
    { name: 'Processing Unit Manager' as Role, icon: Activity, description: 'Monitor efficiency & ESG stats' },
    { name: 'Super Admin' as Role, icon: ShieldCheck, description: 'Platform-wide analytics & network' }
  ];

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-2xl text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-teal-600 p-3 rounded-2xl shadow-sm">
              <Leaf className="text-white" size={40} />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Welcome to FoodBridge
          </h2>
          <p className="mt-2 text-gray-600 text-lg">
            Select your role to continue to the portal
          </p>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-4xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((r) => (
              <button
                key={r.name}
                onClick={() => setSelectedRole(r.name)}
                className="flex items-start p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-teal-300 transition-all text-left group"
              >
                <div className="bg-teal-50 p-4 rounded-xl text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  <r.icon size={28} />
                </div>
                <div className="ml-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{r.name}</h3>
                  <p className="text-gray-500 text-sm font-medium">{r.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Login Form for selected role
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <button 
          onClick={() => { setSelectedRole(null); setError(''); setEmail(''); }}
          className="flex items-center text-sm font-medium text-gray-500 hover:text-teal-600 transition-colors mb-6 mx-auto sm:mx-0"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to roles
        </button>
        
        <div className="flex justify-center">
          <div className="bg-teal-600 p-2 rounded-xl">
            <Leaf className="text-white" size={32} />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {selectedRole} Login
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
                  className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-2.5 border outline-none"
                  placeholder="name@example.com"
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
                  className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg p-2.5 border outline-none"
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
                <span className="px-2 bg-white text-gray-500">Demo {selectedRole} Accounts</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {roleUsers.map(user => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => handleAutoFill(user.email)}
                  className="w-full inline-flex justify-between items-center px-4 py-3 border border-gray-200 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-teal-50 hover:border-teal-200 transition-colors"
                >
                  <div className="flex flex-col items-start">
                    <span className="font-bold text-gray-900">{user.name}</span>
                    {user.facilityName && <span className="text-xs text-gray-500 mt-0.5">{user.facilityName}</span>}
                  </div>
                  <span className="text-xs text-teal-600 bg-teal-100 px-2 py-1 rounded-md">{user.email}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
