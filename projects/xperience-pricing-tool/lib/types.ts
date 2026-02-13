export interface PricingData {
  scrapedAt: string;
  totalCities: number;
  cities: CityPricing[];
}

export interface CityPricing {
  state: string;
  city: string;
  cityDisplay: string;
  stateDisplay: string;
  avgRoofSizeSqft: number;
  avgPitch: string;
  roofsScanned: number;
  lastUpdated: string;
  materials: Record<string, MaterialPricing>;
  laborCostRange: LaborCost | null;
}

export interface MaterialPricing {
  displayName: string;
  costPerSqft: number;
  costPerSquare: number;
}

export interface LaborCost {
  low: number;
  high: number;
  unit: string;
}

export interface RoofSegmentDetail {
  index: number;
  areaSqft: number;
  pitchDegrees: number;
  pitchOver12: number;
  azimuthDegrees: number | null;
}

export interface RoofMeasurement {
  address: string;
  lat: number;
  lng: number;
  roofSqft: number;
  pitchOver12: number;
  pitchDegrees: number;
  segments: number;
  segmentDetails?: RoofSegmentDetail[];
  quality: string;
  maxSunshineHours?: number | null;
  imageryDate?: { year: number; month: number; day: number } | null;
}

export interface MaterialEstimate {
  materialKey: string;
  displayName: string;
  costPerSqft: number;
  costPerSquare: number;
  materialCost: number;
  laborCostLow: number | null;
  laborCostHigh: number | null;
  wasteCost: number;
  totalLow: number | null;
  totalHigh: number | null;
  materialOnlyCost: number;
}

export interface FullEstimate {
  roofSqft: number;
  adjustedSqft: number;
  pitchOver12: number;
  wasteFactor: number;
  wastePercent: string;
  city: string;
  state: string;
  distanceMiles: number;
  materials: MaterialEstimate[];
}
