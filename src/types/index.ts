export type Role = 'Kitchen Admin' | 'NGO/Receiver' | 'Processing Unit Manager' | 'Super Admin';

export interface DailyConsumption {
  date: string;
  predicted: number;
  actual: number;
}

export interface SurplusItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  freshnessScore: number;
  timeToExpiry: string;
  status: 'Available' | 'Pending' | 'Sent';
}

export interface DonationRequest {
  id: string;
  source: string;
  quantity: number;
  unit: string;
  foodType: string;
  pickupWindow: string;
  distance: number;
  qualityVerified: boolean;
  status: 'Requested' | 'Accepted' | 'Picked Up' | 'Delivered';
}

export interface ProcessingKPIs {
  downtimeHours: number;
  rawMaterialLossPercentage: number;
  energyUsageKwh: number;
  overproductionRate: number;
}

export interface ProcessingEfficiency {
  week: string;
  efficiency: number;
}

export interface ESGSustainability {
  carbonSavedKg: number;
  wastePreventedKg: number;
  resourceEfficiencyScore: number;
}

export interface SuperAdminStats {
  totalSurplusRedistributedKg: number;
  mealsSaved: number;
  co2AvoidedKg: number;
  ngosServed: number;
}

export interface KitchenUnitStatus {
  id: string;
  name: string;
  type: 'Kitchen' | 'Processing Unit';
  status: 'Active' | 'Warning' | 'Offline';
  efficiency: number;
}
