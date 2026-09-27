import React, { useState } from 'react';
import { Map, List, Navigation } from 'lucide-react';
import DonationCard from '../components/DonationCard';
import StatCard from '../components/StatCard';
import { mockDonations } from '../data/mockData';

const NGODashboard: React.FC = () => {
  const [donations, setDonations] = useState(mockDonations);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const handleAccept = (id: string) => {
    setDonations(items => 
      items.map(item => item.id === id ? { ...item, status: 'Accepted' as const } : item)
    );
  };

  const activeDonationsCount = donations.filter(d => d.status === 'Requested').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">NGO / Receiver Dashboard</h1>
          <p className="text-gray-500">Find and claim available surplus near you</p>
        </div>
        
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button 
            onClick={() => setViewMode('list')}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-teal-700' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <List size={16} className="mr-2" />
            List View
          </button>
          <button 
            onClick={() => setViewMode('map')}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === 'map' ? 'bg-white shadow-sm text-teal-700' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Map size={16} className="mr-2" />
            Map View
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Available Nearby" value={activeDonationsCount.toString()} icon={Navigation} trend="Within 10km" trendUp={true} />
        <StatCard title="Food Rescued (This Month)" value="450 kg" icon={Map} trend="24% increase" trendUp={true} />
        <StatCard title="People Served" value="1,200" icon={List} trend="Great impact" trendUp={true} />
      </div>

      {viewMode === 'list' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map(donation => (
            <DonationCard 
              key={donation.id} 
              donation={donation} 
              onAccept={handleAccept} 
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-96 flex items-center justify-center bg-gray-50 overflow-hidden relative">
          {/* Placeholder for actual map integration (e.g., Google Maps, Mapbox, Leaflet) */}
          <div className="absolute inset-0 bg-teal-50 opacity-50 flex items-center justify-center">
            <div className="text-center">
              <Map size={48} className="mx-auto text-teal-300 mb-4" />
              <p className="text-gray-500 font-medium">Interactive map view would render here</p>
              <p className="text-sm text-gray-400">Showing {activeDonationsCount} donations nearby</p>
            </div>
          </div>
          
          {/* Mock Map Pins */}
          <div className="absolute top-1/4 left-1/3 bg-white p-2 rounded-lg shadow-lg border border-teal-100 transform -translate-x-1/2 -translate-y-1/2 flex items-center space-x-2">
            <div className="w-3 h-3 bg-teal-500 rounded-full animate-ping"></div>
            <span className="text-xs font-semibold text-gray-800">25kg Available</span>
          </div>
          <div className="absolute top-2/3 left-2/3 bg-white p-2 rounded-lg shadow-lg border border-amber-100 transform -translate-x-1/2 -translate-y-1/2 flex items-center space-x-2">
            <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
            <span className="text-xs font-semibold text-gray-800">Pending Pickup</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NGODashboard;
