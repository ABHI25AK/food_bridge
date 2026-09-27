import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import KitchenDashboard from './pages/KitchenDashboard';
import NGODashboard from './pages/NGODashboard';
import ProcessingDashboard from './pages/ProcessingDashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="kitchen" element={<KitchenDashboard />} />
        <Route path="ngo" element={<NGODashboard />} />
        <Route path="processing" element={<ProcessingDashboard />} />
        <Route path="admin" element={<SuperAdminDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
