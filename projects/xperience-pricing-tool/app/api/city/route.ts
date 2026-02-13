import { NextRequest, NextResponse } from 'next/server';
import { getCityBySlug } from '@/lib/pricing-data';

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug') || '';
  const [state, city] = slug.split('/');
  if (!state || !city) {
    return NextResponse.json({ error: 'Invalid slug' }, { status: 400 });
  }
  const cityData = getCityBySlug(state, city);
  if (!cityData) {
    return NextResponse.json({ error: 'City not found' }, { status: 404 });
  }
  return NextResponse.json(cityData);
}
