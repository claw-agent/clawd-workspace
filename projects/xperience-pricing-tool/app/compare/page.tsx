'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Header from '@/app/components/Header';
import Link from 'next/link';
import type { CityPricing } from '@/lib/types';

function CompareContent() {
  const searchParams = useSearchParams();
  const citiesParam = searchParams.get('cities') || '';

  const [cities, setCities] = useState<CityPricing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<CityPricing[]>([]);
  const [searching, setSearching] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // Load cities from URL params
  useEffect(() => {
    if (!citiesParam) {
      setLoading(false);
      return;
    }
    const slugs = citiesParam.split(',').filter(Boolean);
    Promise.all(
      slugs.map(slug =>
        fetch(`/api/city?slug=${encodeURIComponent(slug)}`).then(r => r.ok ? r.json() : null)
      )
    ).then(results => {
      setCities(results.filter(Boolean));
      setLoading(false);
    });
  }, [citiesParam]);

  // Search cities
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    setSearching(true);
    const timer = setTimeout(async () => {
      const res = await fetch(`/api/city-search?q=${encodeURIComponent(searchQuery)}`);
      if (res.ok) {
        const results = await res.json();
        setSearchResults(results);
      }
      setSearching(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const addCity = (city: CityPricing) => {
    if (cities.length >= 4) return;
    if (cities.some(c => c.state === city.state && c.city === city.city)) return;
    const updated = [...cities, city];
    setCities(updated);
    setShowSearch(false);
    setSearchQuery('');
    // Update URL
    const slugs = updated.map(c => `${c.state}/${c.city}`).join(',');
    window.history.replaceState(null, '', `/compare?cities=${slugs}`);
  };

  const removeCity = (index: number) => {
    const updated = cities.filter((_, i) => i !== index);
    setCities(updated);
    const slugs = updated.map(c => `${c.state}/${c.city}`).join(',');
    window.history.replaceState(null, '', updated.length ? `/compare?cities=${slugs}` : '/compare');
  };

  // Get all common material keys
  const allMaterials = Array.from(
    new Set(cities.flatMap(c => Object.keys(c.materials)))
  );

  // Generate insights
  const insights: string[] = [];
  if (cities.length >= 2 && allMaterials.length > 0) {
    for (const matKey of allMaterials) {
      const priced = cities.filter(c => c.materials[matKey]);
      if (priced.length < 2) continue;
      const sorted = [...priced].sort(
        (a, b) => a.materials[matKey].costPerSqft - b.materials[matKey].costPerSqft
      );
      const cheapest = sorted[0];
      const mostExpensive = sorted[sorted.length - 1];
      const diff = mostExpensive.materials[matKey].costPerSqft - cheapest.materials[matKey].costPerSqft;
      if (diff > 0.1) {
        insights.push(
          `${cheapest.cityDisplay} is $${diff.toFixed(2)}/sqft cheaper for ${cheapest.materials[matKey].displayName} vs ${mostExpensive.cityDisplay}`
        );
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header showBack />
        <div className="p-8 text-center text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header showBack />
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <h1 className="text-2xl font-bold text-navy">Compare Cities</h1>

        {/* Add city button */}
        {cities.length < 4 && (
          <div>
            {!showSearch ? (
              <button
                onClick={() => setShowSearch(true)}
                className="w-full h-12 border-2 border-dashed border-gray-300 rounded-xl
                         text-gray-500 font-medium hover:border-orange hover:text-orange
                         transition-colors cursor-pointer"
              >
                + Add city to compare
              </button>
            ) : (
              <div className="bg-white rounded-xl shadow-md ring-1 ring-black/5 p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search cities..."
                    className="flex-1 h-10 px-3 border border-gray-200 rounded-md text-base outline-none focus:ring-2 focus:ring-orange/50"
                    autoFocus
                  />
                  <button
                    onClick={() => { setShowSearch(false); setSearchQuery(''); }}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
                {searching && <p className="text-sm text-gray-400">Searching...</p>}
                <div className="max-h-60 overflow-y-auto space-y-1">
                  {searchResults.map(city => (
                    <button
                      key={`${city.state}/${city.city}`}
                      onClick={() => addCity(city)}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-cream
                               text-sm font-medium text-navy transition-colors cursor-pointer"
                    >
                      {city.cityDisplay}, {city.stateDisplay}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* City cards */}
        {cities.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">Add cities to compare pricing side by side</p>
            <p className="text-sm mt-2">You can compare up to 4 cities</p>
          </div>
        )}

        {cities.length > 0 && (
          <div className="space-y-4">
            {/* Comparison cards */}
            <div className={`grid gap-4 ${cities.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
              {cities.map((city, idx) => (
                <div
                  key={`${city.state}/${city.city}`}
                  className="bg-white rounded-xl shadow-sm ring-1 ring-black/5 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-navy">
                      {city.cityDisplay}, {city.stateDisplay}
                    </h3>
                    <button
                      onClick={() => removeCity(idx)}
                      className="text-gray-400 hover:text-red-500 text-sm cursor-pointer"
                    >
                      ✕ Remove
                    </button>
                  </div>
                  <p className="text-xs text-gray-400">
                    Avg roof: {city.avgRoofSizeSqft.toLocaleString()} sqft · {city.avgPitch} pitch
                  </p>
                  <div className="space-y-2">
                    {Object.entries(city.materials).map(([key, mat]) => {
                      // Highlight cheapest across cities for this material
                      const allPrices = cities
                        .filter(c => c.materials[key])
                        .map(c => c.materials[key].costPerSqft);
                      const isCheapest = cities.length >= 2 && allPrices.length > 1 &&
                        mat.costPerSqft === Math.min(...allPrices) &&
                        mat.costPerSqft !== Math.max(...allPrices);

                      return (
                        <div
                          key={key}
                          className={`flex justify-between items-center p-2 rounded-lg ${
                            isCheapest ? 'bg-green-50' : 'bg-gray-50'
                          }`}
                        >
                          <span className="text-sm font-medium">{mat.displayName}</span>
                          <span className={`text-sm font-semibold tabular-nums ${
                            isCheapest ? 'text-green-700' : 'text-navy'
                          }`}>
                            ${mat.costPerSqft.toFixed(2)}/sqft
                            {isCheapest && <span className="ml-1 text-xs">✓ lowest</span>}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  {city.laborCostRange && (
                    <p className="text-xs text-gray-500">
                      Labor: ${city.laborCostRange.low.toFixed(2)} – ${city.laborCostRange.high.toFixed(2)}/sqft
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Insights */}
            {insights.length > 0 && (
              <div className="bg-cream rounded-xl p-4 space-y-2">
                <h3 className="font-semibold text-navy text-sm">Insights</h3>
                {insights.map((insight, i) => (
                  <p key={i} className="text-sm text-gray-700">{insight}</p>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="text-center pt-4">
          <Link
            href="/cities"
            className="text-sm text-orange hover:underline"
          >
            Browse all city prices →
          </Link>
        </div>
      </main>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="min-h-screen"><Header showBack /><div className="p-4 text-center">Loading...</div></div>}>
      <CompareContent />
    </Suspense>
  );
}
