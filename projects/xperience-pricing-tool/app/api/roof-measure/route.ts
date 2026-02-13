import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_API_KEY = process.env.GOOGLE_SOLAR_API_KEY!;
const CACHE = new Map<string, { data: unknown; ts: number }>();
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000;

export async function POST(req: NextRequest) {
  const { address } = await req.json();

  if (!address || typeof address !== 'string') {
    return NextResponse.json({ error: 'Address required' }, { status: 400 });
  }

  const cacheKey = address.toLowerCase().trim();
  const cached = CACHE.get(cacheKey);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return NextResponse.json(cached.data);
  }

  try {
    // Step 1: Geocode
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`;
    const geoRes = await fetch(geocodeUrl);
    const geoData = await geoRes.json();

    if (!geoData.results?.[0]) {
      return NextResponse.json({ error: 'Address not found' }, { status: 404 });
    }

    const { lat, lng } = geoData.results[0].geometry.location;
    const formattedAddress = geoData.results[0].formatted_address;

    // Extract city and state from address components
    const components = geoData.results[0].address_components || [];
    let cityName = '';
    let stateName = '';
    for (const comp of components) {
      if (comp.types.includes('locality')) cityName = comp.long_name;
      if (comp.types.includes('administrative_area_level_1')) stateName = comp.long_name;
    }

    // Step 2: Solar API
    let solarData;
    const solarUrl = `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${lat}&location.longitude=${lng}&requiredQuality=HIGH&key=${GOOGLE_API_KEY}`;
    const solarRes = await fetch(solarUrl);

    if (!solarRes.ok) {
      const fallbackUrl = solarUrl.replace('HIGH', 'MEDIUM');
      const fallbackRes = await fetch(fallbackUrl);
      if (!fallbackRes.ok) {
        return NextResponse.json(
          { error: 'Solar data unavailable for this address', cityName, stateName },
          { status: 404 }
        );
      }
      solarData = await fallbackRes.json();
    } else {
      solarData = await solarRes.json();
    }

    const roofSegments = solarData.solarPotential?.roofSegmentStats || [];
    const wholeRoof = solarData.solarPotential?.wholeRoofStats;

    let totalAreaM2 = 0;
    let weightedPitch = 0;

    const segmentDetails = roofSegments.map((seg: { stats?: { areaMeters2?: number }; pitchDegrees?: number; azimuthDegrees?: number }, i: number) => {
      const areaM2 = seg.stats?.areaMeters2 || 0;
      totalAreaM2 += areaM2;
      const pitchDeg = seg.pitchDegrees || 0;
      weightedPitch += pitchDeg * areaM2;
      const pitchRatio = Math.tan(pitchDeg * Math.PI / 180) * 12;
      return {
        index: i + 1,
        areaSqft: Math.round(areaM2 * 10.7639),
        pitchDegrees: Math.round(pitchDeg * 10) / 10,
        pitchOver12: Math.round(pitchRatio * 10) / 10,
        azimuthDegrees: seg.azimuthDegrees != null ? Math.round(seg.azimuthDegrees) : null,
      };
    });

    const avgPitchDeg = totalAreaM2 > 0 ? weightedPitch / totalAreaM2 : 0;
    const pitchOver12 = Math.tan(avgPitchDeg * Math.PI / 180) * 12;
    const totalSqft = Math.round(totalAreaM2 * 10.7639);
    const finalSqft = totalSqft || Math.round((wholeRoof?.areaMeters2 || 0) * 10.7639);

    const maxSunshine = solarData.solarPotential?.maxSunshineHoursPerYear || null;
    const imageryDate = solarData.imageryDate || null;

    const result = {
      address: formattedAddress,
      lat,
      lng,
      roofSqft: finalSqft,
      pitchOver12: Math.round(pitchOver12 * 10) / 10,
      pitchDegrees: Math.round(avgPitchDeg * 10) / 10,
      segments: roofSegments.length,
      segmentDetails,
      quality: solarData.imageryQuality || 'UNKNOWN',
      maxSunshineHours: maxSunshine,
      imageryDate,
      cityName,
      stateName,
    };

    CACHE.set(cacheKey, { data: result, ts: Date.now() });
    return NextResponse.json(result);
  } catch (err: unknown) {
    console.error('Roof measure error:', err);
    return NextResponse.json({ error: 'Failed to measure roof' }, { status: 500 });
  }
}
