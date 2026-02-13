import rawData from '@/data/roofing-prices.json';
import type { PricingData, CityPricing } from './types';

const data = rawData as unknown as PricingData;

const cityIndex = new Map<string, CityPricing>();
const stateIndex = new Map<string, CityPricing[]>();

for (const city of data.cities) {
  cityIndex.set(`${city.state}/${city.city}`, city);
  const existing = stateIndex.get(city.state) || [];
  existing.push(city);
  stateIndex.set(city.state, existing);
}

export function getAllCities(): CityPricing[] {
  return data.cities;
}

export function getCityBySlug(state: string, city: string): CityPricing | undefined {
  return cityIndex.get(`${state}/${city}`);
}

export function getCitiesByState(state: string): CityPricing[] {
  return stateIndex.get(state) || [];
}

export function getAllStates(): string[] {
  return Array.from(stateIndex.keys()).sort();
}

export function searchCities(query: string): CityPricing[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return data.cities.filter(c =>
    c.cityDisplay.toLowerCase().includes(q) ||
    c.stateDisplay.toLowerCase().includes(q) ||
    `${c.cityDisplay}, ${c.stateDisplay}`.toLowerCase().includes(q)
  ).slice(0, 50);
}

export function getNationalAverages(): Record<string, { avg: number; min: number; max: number }> {
  const byMaterial: Record<string, number[]> = {};
  for (const city of data.cities) {
    for (const [key, mat] of Object.entries(city.materials)) {
      if (!byMaterial[key]) byMaterial[key] = [];
      byMaterial[key].push(mat.costPerSqft);
    }
  }
  const result: Record<string, { avg: number; min: number; max: number }> = {};
  for (const [key, prices] of Object.entries(byMaterial)) {
    result[key] = {
      avg: prices.reduce((a, b) => a + b, 0) / prices.length,
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }
  return result;
}

export function findCityByName(cityName: string, stateName: string): CityPricing | null {
  const citySlug = cityName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  const stateSlug = stateName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  
  // Try exact match first
  const exact = cityIndex.get(`${stateSlug}/${citySlug}`);
  if (exact) return exact;

  // Try partial match - find cities in this state
  const stateCities = stateIndex.get(stateSlug) || [];
  
  // Try slug contains
  const partial = stateCities.find(c => 
    c.city.includes(citySlug) || citySlug.includes(c.city) ||
    c.cityDisplay.toLowerCase().includes(cityName.toLowerCase())
  );
  if (partial) return partial;

  // Fallback: first city in the state (geographic fallback handled by caller with lat/lng)
  if (stateCities.length > 0) return stateCities[0];

  return null;
}
