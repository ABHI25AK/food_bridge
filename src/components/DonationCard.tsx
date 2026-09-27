import React from 'react';
import type { DonationRequest } from '../types';
import StatusBadge from './StatusBadge';
import { MapPin, Clock, ShieldCheck, Box } from 'lucide-react';

interface DonationCardProps {
  donation: DonationRequest;
  onAccept?: (id: string) => void;
}

const DonationCard: React.FC<DonationCardProps> = ({ donation, onAccept }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col justify-between transition-all hover:shadow-md">
      <div>
        <div className="flex justify-between items-start mb-3">
          <h4 className="font-semibold text-gray-900 text-lg">{donation.source}</h4>
          <StatusBadge status={donation.status} />
        </div>
        
        <div className="space-y-2 mt-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Box size={16} className="text-teal-600 mr-2" />
            <span className="font-medium text-gray-900 mr-1">{donation.quantity} {donation.unit}</span> 
            of {donation.foodType}
          </div>
          <div className="flex items-center">
            <MapPin size={16} className="text-teal-600 mr-2" />
            {donation.distance} km away
          </div>
          <div className="flex items-center">
            <Clock size={16} className="text-teal-600 mr-2" />
            Pickup: {donation.pickupWindow}
          </div>
          {donation.qualityVerified && (
            <div className="flex items-center text-emerald-600 font-medium">
              <ShieldCheck size={16} className="mr-2" />
              Quality Verified
            </div>
          )}
        </div>
      </div>
      
      {donation.status === 'Requested' && onAccept && (
        <button 
          onClick={() => onAccept(donation.id)}
          className="mt-5 w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Accept Donation
        </button>
      )}
    </div>
  );
};

export default DonationCard;
