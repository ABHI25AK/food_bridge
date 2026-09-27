import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import KitchenDashboard from './pages/KitchenDashboard';
import NGODashboard from './pages/NGODashboard';
import ProcessingDashboard from './pages/ProcessingDashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import type { Role } from './types';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: Role[] }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />; // Or to a 'unauthorized' page
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route path="kitchen" element={
          <ProtectedRoute allowedRoles={['Kitchen Admin']}>
            <KitchenDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="ngo" element={
          <ProtectedRoute allowedRoles={['NGO/Receiver']}>
            <NGODashboard />
          </ProtectedRoute>
        } />
        
        <Route path="processing" element={
          <ProtectedRoute allowedRoles={['Processing Unit Manager']}>
            <ProcessingDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="admin" element={
          <ProtectedRoute allowedRoles={['Super Admin']}>
            <SuperAdminDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
