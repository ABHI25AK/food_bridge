import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Role } from '../types';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  facilityName?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock Users Database
export const mockUsers: User[] = [
  { id: '1', name: 'Alice Kitchen', email: 'kitchen1@test.com', role: 'Kitchen Admin', facilityName: 'Central University Kitchen' },
  { id: '2', name: 'Bob Kitchen', email: 'kitchen2@test.com', role: 'Kitchen Admin', facilityName: 'City Hospital Canteen' },
  { id: '3', name: 'Charlie NGO', email: 'ngo1@test.com', role: 'NGO/Receiver', facilityName: 'Hope Foundation' },
  { id: '4', name: 'Diana NGO', email: 'ngo2@test.com', role: 'NGO/Receiver', facilityName: 'Food Rescue Inc' },
  { id: '5', name: 'Eve Processing', email: 'processing1@test.com', role: 'Processing Unit Manager', facilityName: 'Northside Processing Unit' },
  { id: '6', name: 'Frank Processing', email: 'processing2@test.com', role: 'Processing Unit Manager', facilityName: 'Southside Food Factory' },
  { id: '7', name: 'Grace Admin', email: 'admin1@test.com', role: 'Super Admin' },
  { id: '8', name: 'Hank Admin', email: 'admin2@test.com', role: 'Super Admin' }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('foodbridge_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, pass: string) => {
    // For demo: any password works, just check email
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && pass === 'pass123') {
      setUser(foundUser);
      localStorage.setItem('foodbridge_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('foodbridge_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
