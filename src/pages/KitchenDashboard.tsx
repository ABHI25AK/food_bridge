import React, { useState } from 'react';
import { Utensils, AlertTriangle, Send, Activity, Plus } from 'lucide-react';
import StatCard from '../components/StatCard';
import ChartPanel from '../components/ChartPanel';
import StatusBadge from '../components/StatusBadge';
import { mockDailyConsumption, mockSurplusItems } from '../data/mockData';

const KitchenDashboard: React.FC = () => {
  const [surplusItems, setSurplusItems] = useState(mockSurplusItems);

  const handleSendToNGO = (id: string) => {
    setSurplusItems(items => 
      items.map(item => item.id === id ? { ...item, status: 'Sent' as const } : item)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kitchen Dashboard</h1>
          <p className="text-gray-500">Manage daily production and surplus</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
          <Plus size={18} className="mr-2" />
          Log Meals
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Meals Prepared (Today)" value="450" icon={Utensils} trend="12%" trendUp={true} />
        <StatCard title="Predicted Demand" value="430" icon={Activity} trend="Accurate within 5%" trendUp={true} />
        <StatCard title="Surplus Flagged" value="3 Items" icon={AlertTriangle} trend="Action Required" trendUp={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Column */}
        <div className="lg:col-span-2">
          <ChartPanel 
            title="Demand vs Actual Consumption (Past 7 Days)"
            data={mockDailyConsumption}
            xKey="date"
            series={[
              { key: 'predicted', name: 'Predicted Demand', color: '#94a3b8' },
              { key: 'actual', name: 'Actual Consumption', color: '#028090' }
            ]}
          />
        </div>

        {/* Action Panel Column */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Surplus Alerts & Quality</h3>
            <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full">Action Needed</span>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {surplusItems.map(item => (
              <div key={item.id} className="p-4 rounded-lg border border-gray-100 bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">{item.name}</h4>
                  <StatusBadge status={item.status} />
                </div>
                
                <div className="text-sm text-gray-600 mb-3 space-y-1">
                  <p>Quantity: <span className="font-medium text-gray-900">{item.quantity} {item.unit}</span></p>
                  <p>Freshness: <span className={`font-medium ${item.freshnessScore > 90 ? 'text-emerald-600' : 'text-amber-600'}`}>{item.freshnessScore}%</span></p>
                  <p className="text-red-600 font-medium text-xs mt-1">Expires in {item.timeToExpiry}</p>
                </div>
                
                {item.status === 'Available' && (
                  <button 
                    onClick={() => handleSendToNGO(item.id)}
                    className="w-full flex items-center justify-center py-2 px-4 bg-white border border-teal-600 text-teal-700 rounded-lg hover:bg-teal-50 transition-colors text-sm font-medium"
                  >
                    <Send size={16} className="mr-2" />
                    Send to NGO Network
                  </button>
                )}
                {item.status === 'Pending' && (
                  <button disabled className="w-full py-2 px-4 bg-gray-200 text-gray-500 rounded-lg text-sm font-medium cursor-not-allowed">
                    Awaiting Response
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KitchenDashboard;
