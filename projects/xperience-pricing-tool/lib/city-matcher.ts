import cityCoordsData from '@/data/city-coords.json';
import { getAllCities } from './pricing-data';
import type { CityPricing } from './types';

const cityCoords = cityCoordsData as unknown as Record<string, [number, number]>;

export function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3959; // Earth radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function getCityCoords(state: string, city: string): [number, number] | null {
  return cityCoords[`${state}/${city}`] || null;
}

export function findNearestCity(lat: number, lng: number): {
  city: CityPricing;
  distanceMiles: number;
} | null {
  const cities = getAllCities();
  let bestCity: CityPricing | null = null;
  let bestDist = Infinity;

  for (const city of cities) {
    const coords = cityCoords[`${city.state}/${city.city}`];
    if (!coords) continue;
    const dist = haversineDistance(lat, lng, coords[0], coords[1]);
    if (dist < bestDist) {
      bestDist = dist;
      bestCity = city;
    }
  }

  if (!bestCity) return null;
  return { city: bestCity, distanceMiles: Math.round(bestDist) };
}

export function findNearestCityInState(lat: number, lng: number, stateCities: CityPricing[]): CityPricing | null {
  let bestCity: CityPricing | null = null;
  let bestDist = Infinity;

  for (const city of stateCities) {
    const coords = cityCoords[`${city.state}/${city.city}`];
    if (!coords) continue;
    const dist = haversineDistance(lat, lng, coords[0], coords[1]);
    if (dist < bestDist) {
      bestDist = dist;
      bestCity = city;
    }
  }

  return bestCity;
}
