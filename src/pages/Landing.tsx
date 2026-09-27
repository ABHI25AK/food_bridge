import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Leaf, Shield, Globe } from 'lucide-react';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 px-4 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-teal-100 rounded-full mb-6">
          <Leaf className="text-teal-600 mr-2" size={24} />
          <span className="text-teal-800 font-semibold tracking-wide uppercase text-sm">FoodBridge Initiative</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
          Intelligent Food Waste <br />
          <span className="text-teal-600">Reduction & Redistribution</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Connecting institutional kitchens, processing units, and NGOs to rescue surplus food, optimize resources, and minimize carbon footprint.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <button 
            onClick={() => navigate('/kitchen')}
            className="flex items-center justify-center px-8 py-4 text-lg font-medium rounded-xl text-white bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-200 transition-all"
          >
            I have surplus food
            <ArrowRight className="ml-2" size={20} />
          </button>
          <button 
            onClick={() => navigate('/ngo')}
            className="flex items-center justify-center px-8 py-4 text-lg font-medium rounded-xl text-teal-700 bg-teal-50 border border-teal-200 hover:bg-teal-100 transition-all"
          >
            I want to receive food
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-16 bg-white rounded-3xl shadow-sm border border-gray-100 my-8 px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">The Scale of the Problem</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="w-16 h-16 mx-auto bg-amber-100 rounded-2xl flex items-center justify-center mb-6">
              <Globe className="text-amber-600" size={32} />
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">19%</h3>
            <p className="text-gray-600 font-medium">of food wasted globally at consumer stages</p>
          </div>
          <div className="p-6">
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-2xl flex items-center justify-center mb-6">
              <Leaf className="text-red-600" size={32} />
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">1B+</h3>
            <p className="text-gray-600 font-medium">meals wasted daily worldwide</p>
          </div>
          <div className="p-6">
            <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
              <Shield className="text-emerald-600" size={32} />
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">8-10%</h3>
            <p className="text-gray-600 font-medium">of global GHG emissions from food waste</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
