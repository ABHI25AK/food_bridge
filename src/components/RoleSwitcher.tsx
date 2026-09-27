import React from 'react';
import type { Role } from '../types';

interface RoleSwitcherProps {
  currentRole: Role | null;
  onRoleChange: (role: Role) => void;
}

const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ currentRole, onRoleChange }) => {
  const roles: Role[] = ['Kitchen Admin', 'NGO/Receiver', 'Processing Unit Manager', 'Super Admin'];

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-500 font-medium">Demo Role:</span>
      <select
        value={currentRole || ''}
        onChange={(e) => onRoleChange(e.target.value as Role)}
        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-2 outline-none"
      >
        <option value="" disabled>Select Role</option>
        {roles.map(role => (
          <option key={role} value={role}>{role}</option>
        ))}
      </select>
    </div>
  );
};

export default RoleSwitcher;
