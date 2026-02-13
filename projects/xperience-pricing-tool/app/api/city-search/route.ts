import { NextRequest, NextResponse } from 'next/server';
import { searchCities } from '@/lib/pricing-data';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') || '';
  const results = searchCities(q);
  return NextResponse.json(results);
}
