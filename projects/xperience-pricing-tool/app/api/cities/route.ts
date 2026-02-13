import { NextResponse } from 'next/server';
import { getAllCities } from '@/lib/pricing-data';

export async function GET() {
  const cities = getAllCities().map(c => ({
    state: c.state,
    city: c.city,
    cityDisplay: c.cityDisplay,
    stateDisplay: c.stateDisplay,
    materials: c.materials,
  }));
  return NextResponse.json({ cities });
}
