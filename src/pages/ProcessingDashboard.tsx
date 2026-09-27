import React from 'react';
import { Clock, TrendingDown, Zap, ShieldAlert, Leaf, Recycle, Heart } from 'lucide-react';
import StatCard from '../components/StatCard';
import ChartPanel from '../components/ChartPanel';
import { mockProcessingKPIs, mockEfficiencyTrends, mockESG } from '../data/mockData';

const ProcessingDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Processing Unit Dashboard</h1>
          <p className="text-gray-500">Monitor operational efficiency and ESG metrics</p>
        </div>
        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
          Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Downtime Hours" value={mockProcessingKPIs.downtimeHours.toString()} icon={Clock} trend="-2h vs last week" trendUp={true} />
        <StatCard title="Raw Material Loss" value={`${mockProcessingKPIs.rawMaterialLossPercentage}%`} icon={TrendingDown} trend="Optimized" trendUp={true} />
        <StatCard title="Energy Usage" value={`${mockProcessingKPIs.energyUsageKwh} kWh`} icon={Zap} trend="+5% vs avg" trendUp={false} />
        <StatCard title="Overproduction" value={`${mockProcessingKPIs.overproductionRate}%`} icon={ShieldAlert} trend="Needs Attention" trendUp={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartPanel 
            title="Processing Efficiency Trend (Weekly)"
            data={mockEfficiencyTrends}
            type="bar"
            xKey="week"
            series={[
              { key: 'efficiency', name: 'Efficiency Score (%)', color: '#00A896' }
            ]}
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <div className="flex items-center mb-6">
            <Leaf className="text-emerald-500 mr-2" size={24} />
            <h3 className="text-lg font-semibold text-gray-900">ESG & Sustainability</h3>
          </div>
          
          <div className="flex-1 space-y-6">
            <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
              <div className="flex items-center text-emerald-800 mb-1">
                <Recycle size={18} className="mr-2" />
                <span className="font-medium text-sm">Carbon Footprint Avoided</span>
              </div>
              <h4 className="text-3xl font-bold text-emerald-600">{mockESG.carbonSavedKg} <span className="text-lg font-medium">kg CO₂</span></h4>
            </div>
            
            <div className="bg-teal-50 rounded-xl p-5 border border-teal-100">
              <div className="flex items-center text-teal-800 mb-1">
                <Heart size={18} className="mr-2" />
                <span className="font-medium text-sm">Waste Prevented</span>
              </div>
              <h4 className="text-3xl font-bold text-teal-600">{mockESG.wastePreventedKg} <span className="text-lg font-medium">kg</span></h4>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Resource Efficiency Score</span>
                <span className="text-sm font-bold text-gray-900">{mockESG.resourceEfficiencyScore}/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: `${mockESG.resourceEfficiencyScore}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingDashboard;
