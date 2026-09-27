import React, { useState } from 'react';
import { Globe, Users, Heart, Leaf, Filter } from 'lucide-react';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import { mockSuperAdminStats, mockUnitStatuses } from '../data/mockData';

const SuperAdminDashboard: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Kitchen' | 'Processing Unit'>('All');

  const filteredUnits = filter === 'All' 
    ? mockUnitStatuses 
    : mockUnitStatuses.filter(u => u.type === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Platform Analytics</h1>
          <p className="text-gray-500">Global overview across all connected facilities</p>
        </div>
        <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
          <Filter size={16} className="text-gray-400" />
          <select className="bg-transparent border-none text-sm font-medium text-gray-700 outline-none focus:ring-0">
            <option>Last 30 Days</option>
            <option>Last Quarter</option>
            <option>Year to Date</option>
            <option>All Time</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Surplus Redistributed" value={`${(mockSuperAdminStats.totalSurplusRedistributedKg / 1000).toFixed(1)}k kg`} icon={Heart} trend="+12% MoM" trendUp={true} />
        <StatCard title="Equivalent Meals Saved" value={(mockSuperAdminStats.mealsSaved / 1000).toFixed(1) + 'k'} icon={Users} trend="+15% MoM" trendUp={true} />
        <StatCard title="CO₂ Avoided" value={`${(mockSuperAdminStats.co2AvoidedKg / 1000).toFixed(1)}k kg`} icon={Leaf} trend="Significant impact" trendUp={true} />
        <StatCard title="Active NGOs Served" value={mockSuperAdminStats.ngosServed.toString()} icon={Globe} trend="+5 this month" trendUp={true} />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-lg font-semibold text-gray-900">Connected Facilities Network</h3>
          
          <div className="flex space-x-2">
            {['All', 'Kitchen', 'Processing Unit'].map(type => (
              <button
                key={type}
                onClick={() => setFilter(type as any)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${filter === type ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-medium">Facility Name</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Efficiency Score</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUnits.map(unit => (
                <tr key={unit.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <span className="font-medium text-gray-900">{unit.name}</span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{unit.type}</td>
                  <td className="p-4">
                    <StatusBadge status={unit.status} />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-700 w-8">{unit.efficiency}%</span>
                      <div className="w-24 bg-gray-200 rounded-full h-1.5 ml-2">
                        <div 
                          className={`h-1.5 rounded-full ${unit.efficiency >= 90 ? 'bg-emerald-500' : unit.efficiency >= 70 ? 'bg-amber-500' : 'bg-red-500'}`} 
                          style={{ width: `${unit.efficiency}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-teal-600 hover:text-teal-800 text-sm font-medium">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
