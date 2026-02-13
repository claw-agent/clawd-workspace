import { notFound } from 'next/navigation';
import { getCityBySlug, getAllCities, getNationalAverages } from '@/lib/pricing-data';
import Header from '@/app/components/Header';
import DataSourcesSection from '@/app/components/DataSourcesSection';
import RawDataView from '@/app/components/RawDataView';
import Link from 'next/link';

export async function generateStaticParams() {
  const cities = getAllCities();
  return cities.map(c => ({ state: c.state, city: c.city }));
}

function fmt(n: number): string {
  return '$' + n.toLocaleString('en-US');
}

export default async function CityPage({ params }: { params: Promise<{ state: string; city: string }> }) {
  const { state, city } = await params;
  const cityData = getCityBySlug(state, city);
  if (!cityData) notFound();

  const nationalAverages = getNationalAverages();
  const materials = Object.entries(cityData.materials);

  return (
    <div className="min-h-screen">
      <Header showBack />
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-navy md:text-3xl">
            Roofing Prices in {cityData.cityDisplay}, {cityData.stateDisplay}
          </h1>
        </div>

        {/* City stats */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400 text-xs uppercase">Avg Roof Size</p>
              <p className="font-semibold text-navy">{cityData.avgRoofSizeSqft.toLocaleString()} sqft</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase">Avg Pitch</p>
              <p className="font-semibold text-navy">{cityData.avgPitch}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase">Roofs Scanned</p>
              <p className="font-semibold text-navy">{cityData.roofsScanned.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase">Updated</p>
              <p className="font-semibold text-navy">{cityData.lastUpdated}</p>
            </div>
          </div>
        </div>

        {/* Materials */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-orange mb-3">
            Material Pricing
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-white rounded-xl shadow-sm border border-gray-100">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  <th className="px-5 py-3 text-xs text-gray-400 uppercase font-semibold">Material</th>
                  <th className="px-5 py-3 text-xs text-gray-400 uppercase font-semibold text-right">Per Sqft</th>
                  <th className="px-5 py-3 text-xs text-gray-400 uppercase font-semibold text-right">Per Square</th>
                  <th className="px-5 py-3 text-xs text-gray-400 uppercase font-semibold text-right">vs. National</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {materials.map(([key, mat]) => {
                  const natAvg = nationalAverages[key]?.avg;
                  const pctDiff = natAvg ? Math.round(((mat.costPerSqft - natAvg) / natAvg) * 100) : null;

                  return (
                    <tr key={key}>
                      <td className="px-5 py-3 font-semibold text-navy">{mat.displayName}</td>
                      <td className="px-5 py-3 text-right tabular-nums font-medium">{fmt(mat.costPerSqft)}</td>
                      <td className="px-5 py-3 text-right tabular-nums">{fmt(mat.costPerSquare)}</td>
                      <td className="px-5 py-3 text-right text-xs">
                        {pctDiff !== null && (
                          <span className={pctDiff < 0 ? 'text-green-600 font-medium' : 'text-gray-500'}>
                            {pctDiff < 0 ? '' : '+'}{pctDiff}%
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Labor */}
        {cityData.laborCostRange && (
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange mb-2">Labor</p>
            <p className="text-lg font-semibold text-navy tabular-nums">
              {fmt(cityData.laborCostRange.low)} &ndash; {fmt(cityData.laborCostRange.high)} / sqft
            </p>
          </div>
        )}

        {/* Raw data */}
        <RawDataView cityData={cityData} />

        {/* Data sources */}
        <DataSourcesSection />

        {/* CTA */}
        <Link
          href="/"
          className="block w-full h-14 bg-orange text-white text-lg font-semibold rounded-lg
                     text-center leading-[3.5rem] active:scale-[0.98] transition-transform"
        >
          Get estimate for a specific address
        </Link>
      </main>
    </div>
  );
}
