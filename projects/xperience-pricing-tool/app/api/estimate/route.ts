import { NextRequest, NextResponse } from 'next/server';
import { findCityByName, getAllCities, getNationalAverages, getCitiesByState } from '@/lib/pricing-data';
import { calculateEstimate } from '@/lib/calculations';
import { findNearestCity, findNearestCityInState } from '@/lib/city-matcher';

export async function POST(req: NextRequest) {
  const { roofSqft, pitchOver12, cityName, stateName, lat, lng } = await req.json();

  if (!roofSqft || pitchOver12 === undefined) {
    return NextResponse.json({ error: 'Missing roof data' }, { status: 400 });
  }

  let matchedCity = findCityByName(cityName || '', stateName || '');
  let distanceMiles = 0;

  // If we have lat/lng, compute real distance even for exact matches
  if (matchedCity && lat && lng) {
    const nearest = findNearestCity(lat, lng);
    if (nearest) {
      // If the nearest city by geo is different and closer, prefer it
      if (nearest.city.state === matchedCity.state && nearest.city.city === matchedCity.city) {
        distanceMiles = nearest.distanceMiles;
      } else {
        // Use geo-nearest instead of name match
        matchedCity = nearest.city;
        distanceMiles = nearest.distanceMiles;
      }
    }
  }

  if (!matchedCity) {
    // Try geo-nearest if we have coordinates
    if (lat && lng) {
      const nearest = findNearestCity(lat, lng);
      if (nearest) {
        matchedCity = nearest.city;
        distanceMiles = nearest.distanceMiles;
      }
    }

    // Final fallback: nearest city in state, or first city
    if (!matchedCity) {
      const stateSlug = (stateName || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
      const stateCities = getCitiesByState(stateSlug);

      if (stateCities.length > 0 && lat && lng) {
        matchedCity = findNearestCityInState(lat, lng, stateCities) || stateCities[0];
      } else if (stateCities.length > 0) {
        matchedCity = stateCities[0];
      } else {
        matchedCity = getAllCities()[0];
      }

      // Compute distance for fallback
      if (lat && lng) {
        const nearest = findNearestCity(lat, lng);
        if (nearest) distanceMiles = nearest.distanceMiles;
      }
    }
  }

  const estimate = calculateEstimate(roofSqft, pitchOver12, matchedCity, distanceMiles);
  const nationalAverages = getNationalAverages();

  return NextResponse.json({
    estimate,
    matchedCity,
    nationalAverages,
  });
}
