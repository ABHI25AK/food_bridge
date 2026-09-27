import React from 'react';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStyles = () => {
    switch (status.toLowerCase()) {
      case 'available':
      case 'active':
      case 'delivered':
        return 'bg-emerald-100 text-emerald-800';
      case 'pending':
      case 'requested':
      case 'warning':
        return 'bg-amber-100 text-amber-800';
      case 'sent':
      case 'accepted':
      case 'picked up':
        return 'bg-blue-100 text-blue-800';
      case 'offline':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStyles()}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
