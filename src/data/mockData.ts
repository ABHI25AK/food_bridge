import type {
  DailyConsumption,
  SurplusItem,
  DonationRequest,
  ProcessingKPIs,
  ProcessingEfficiency,
  ESGSustainability,
  SuperAdminStats,
  KitchenUnitStatus
} from '../types';

export const mockDailyConsumption: DailyConsumption[] = [
  { date: 'Mon', predicted: 450, actual: 430 },
  { date: 'Tue', predicted: 480, actual: 460 },
  { date: 'Wed', predicted: 500, actual: 490 },
  { date: 'Thu', predicted: 470, actual: 450 },
  { date: 'Fri', predicted: 520, actual: 510 },
  { date: 'Sat', predicted: 300, actual: 280 },
  { date: 'Sun', predicted: 280, actual: 260 },
];

export const mockSurplusItems: SurplusItem[] = [
  { id: '1', name: 'Cooked Rice', quantity: 15, unit: 'kg', freshnessScore: 92, timeToExpiry: '4 hours', status: 'Available' },
  { id: '2', name: 'Lentil Soup (Dal)', quantity: 20, unit: 'L', freshnessScore: 88, timeToExpiry: '3 hours', status: 'Pending' },
  { id: '3', name: 'Mixed Vegetables', quantity: 10, unit: 'kg', freshnessScore: 85, timeToExpiry: '5 hours', status: 'Available' },
  { id: '4', name: 'Bread Loaves', quantity: 30, unit: 'pcs', freshnessScore: 95, timeToExpiry: '2 days', status: 'Sent' },
  { id: '5', name: 'Salad Greens', quantity: 5, unit: 'kg', freshnessScore: 75, timeToExpiry: '1 hour', status: 'Available' },
];

export const mockDonations: DonationRequest[] = [
  { id: 'd1', source: 'Central University Kitchen', quantity: 25, unit: 'kg', foodType: 'Prepared Meals', pickupWindow: '2:00 PM - 4:00 PM', distance: 2.4, qualityVerified: true, status: 'Requested' },
  { id: 'd2', source: 'City Hospital Canteen', quantity: 10, unit: 'kg', foodType: 'Fresh Produce', pickupWindow: '1:00 PM - 3:00 PM', distance: 5.1, qualityVerified: true, status: 'Accepted' },
  { id: 'd3', source: 'Tech Park Cafeteria', quantity: 40, unit: 'kg', foodType: 'Baked Goods', pickupWindow: '4:00 PM - 6:00 PM', distance: 1.2, qualityVerified: false, status: 'Picked Up' },
  { id: 'd4', source: 'Downtown Community Center', quantity: 15, unit: 'kg', foodType: 'Prepared Meals', pickupWindow: '3:00 PM - 5:00 PM', distance: 3.8, qualityVerified: true, status: 'Requested' },
  { id: 'd5', source: 'Railway Station Canteen', quantity: 50, unit: 'kg', foodType: 'Packaged Food', pickupWindow: 'All Day', distance: 6.5, qualityVerified: true, status: 'Delivered' },
];

export const mockProcessingKPIs: ProcessingKPIs = {
  downtimeHours: 12.5,
  rawMaterialLossPercentage: 3.2,
  energyUsageKwh: 4500,
  overproductionRate: 4.5,
};

export const mockEfficiencyTrends: ProcessingEfficiency[] = [
  { week: 'Week 1', efficiency: 85 },
  { week: 'Week 2', efficiency: 88 },
  { week: 'Week 3', efficiency: 87 },
  { week: 'Week 4', efficiency: 92 },
  { week: 'Week 5', efficiency: 94 },
];

export const mockESG: ESGSustainability = {
  carbonSavedKg: 1250,
  wastePreventedKg: 850,
  resourceEfficiencyScore: 92,
};

export const mockSuperAdminStats: SuperAdminStats = {
  totalSurplusRedistributedKg: 45200,
  mealsSaved: 150000,
  co2AvoidedKg: 115000,
  ngosServed: 124,
};

export const mockUnitStatuses: KitchenUnitStatus[] = [
  { id: 'u1', name: 'Central University Kitchen', type: 'Kitchen', status: 'Active', efficiency: 95 },
  { id: 'u2', name: 'Northside Processing Unit', type: 'Processing Unit', status: 'Warning', efficiency: 78 },
  { id: 'u3', name: 'City Hospital Canteen', type: 'Kitchen', status: 'Active', efficiency: 92 },
  { id: 'u4', name: 'East End Bakery Hub', type: 'Processing Unit', status: 'Offline', efficiency: 0 },
  { id: 'u5', name: 'Tech Park Cafeteria', type: 'Kitchen', status: 'Active', efficiency: 88 },
  { id: 'u6', name: 'Downtown Community Center', type: 'Kitchen', status: 'Active', efficiency: 91 },
  { id: 'u7', name: 'Southside Food Factory', type: 'Processing Unit', status: 'Active', efficiency: 85 },
];
