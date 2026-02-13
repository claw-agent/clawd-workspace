'use client';

import { useState, useEffect, useMemo } from 'react';
import Header from '@/app/components/Header';
import Link from 'next/link';
import { Search, ArrowUpDown } from 'lucide-react';

interface CityEntry {
  state: string;
  city: string;
  cityDisplay: string;
  stateDisplay: string;
  materials: Record<string, { displayName: string; costPerSqft: number }>;
  avgRoofSizeSqft?: number;
}

type SortKey = 'city' | 'state' | 'price';
type SortDir = 'asc' | 'desc';

export default function CitiesPage() {
  const [cities, setCities] = useState<CityEntry[]>([]);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('state');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [viewMode, setViewMode] = useState<'table' | 'grouped'>('table');

  useEffect(() => {
    fetch('/api/cities')
      .then(r => r.json())
      .then(d => setCities(d.cities || []));
  }, []);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const getMinPrice = (c: CityEntry) =>
    Math.min(...Object.values(c.materials).map(m => m.costPerSqft));

  const filtered = useMemo(() => {
    let result = cities;
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(c =>
        c.cityDisplay.toLowerCase().includes(q) ||
        c.stateDisplay.toLowerCase().includes(q)
      );
    }
    result = [...result].sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'city') cmp = a.cityDisplay.localeCompare(b.cityDisplay);
      else if (sortKey === 'state') cmp = a.stateDisplay.localeCompare(b.stateDisplay) || a.cityDisplay.localeCompare(b.cityDisplay);
      else cmp = getMinPrice(a) - getMinPrice(b);
      return sortDir === 'desc' ? -cmp : cmp;
    });
    return result;
  }, [cities, query, sortKey, sortDir]);

  const grouped = useMemo(() => {
    const map = new Map<string, CityEntry[]>();
    for (const c of filtered) {
      const arr = map.get(c.stateDisplay) || [];
      arr.push(c);
      map.set(c.stateDisplay, arr);
    }
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [filtered]);

  const [expandedStates, setExpandedStates] = useState<Set<string>>(new Set());
  const toggleState = (state: string) => {
    setExpandedStates(prev => {
      const next = new Set(prev);
      if (next.has(state)) next.delete(state);
      else next.add(state);
      return next;
    });
  };
  const isSearching = query.trim().length > 0;

  const SortHeader = ({ label, sortKeyVal }: { label: string; sortKeyVal: SortKey }) => (
    <button
      onClick={() => toggleSort(sortKeyVal)}
      className="flex items-center gap-1 text-xs uppercase text-gray-400 hover:text-gray-600 cursor-pointer font-semibold"
    >
      {label}
      <ArrowUpDown className={`w-3 h-3 ${sortKey === sortKeyVal ? 'text-orange' : ''}`} />
    </button>
  );

  return (
    <div className="min-h-screen">
      <Header showBack />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-baseline justify-between mb-1">
          <h1 className="text-2xl font-bold text-navy md:text-3xl">City Prices</h1>
          <div className="flex items-center gap-1 text-xs">
            <button
              onClick={() => setViewMode('table')}
              className={`px-2 py-1 rounded cursor-pointer ${viewMode === 'table' ? 'bg-navy text-white' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Table
            </button>
            <button
              onClick={() => setViewMode('grouped')}
              className={`px-2 py-1 rounded cursor-pointer ${viewMode === 'grouped' ? 'bg-navy text-white' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Grouped
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-400 mb-4">{cities.length} cities across 50 states</p>

        <div className="sticky top-14 z-40 bg-cream py-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cities..."
              className="w-full h-11 px-4 pl-10 text-sm bg-white border border-gray-200
                         rounded-md focus:ring-2 focus:ring-orange/50 focus:border-orange
                         placeholder:text-gray-400 outline-none"
            />
          </div>
        </div>

        {filtered.length === 0 && query.trim() && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">No cities matching &ldquo;{query}&rdquo;</p>
            <Link href="/" className="text-orange text-sm mt-2 inline-block">
              Enter an address instead
            </Link>
          </div>
        )}

        {viewMode === 'table' ? (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-2 pr-3 text-left"><SortHeader label="City" sortKeyVal="city" /></th>
                  <th className="pb-2 pr-3 text-left"><SortHeader label="State" sortKeyVal="state" /></th>
                  <th className="pb-2 text-right"><SortHeader label="From $/sqft" sortKeyVal="price" /></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.slice(0, 200).map(c => (
                  <tr key={`${c.state}/${c.city}`} className="hover:bg-white/60">
                    <td className="py-2.5 pr-3">
                      <Link
                        href={`/cities/${c.state}/${c.city}`}
                        className="font-medium text-navy hover:text-orange transition-colors"
                      >
                        {c.cityDisplay}
                      </Link>
                    </td>
                    <td className="py-2.5 pr-3 text-gray-500">{c.stateDisplay}</td>
                    <td className="py-2.5 text-right tabular-nums font-medium">
                      ${getMinPrice(c).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length > 200 && (
              <p className="text-xs text-gray-400 text-center mt-4">
                Showing 200 of {filtered.length} results. Narrow your search.
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-1 mt-4">
            {grouped.map(([state, stateCities]) => {
              const isOpen = isSearching || expandedStates.has(state);
              return (
                <div key={state}>
                  <button
                    onClick={() => toggleState(state)}
                    className="w-full flex items-center justify-between py-3 px-2 text-left
                               font-semibold text-navy hover:bg-white/50 rounded-lg cursor-pointer"
                  >
                    <span>{state} ({stateCities.length})</span>
                    <span className="text-xs text-gray-400">{isOpen ? 'Collapse' : 'Expand'}</span>
                  </button>
                  {isOpen && (
                    <div className="pl-4 pb-2 space-y-0.5">
                      {stateCities.map(c => (
                        <Link
                          key={`${c.state}/${c.city}`}
                          href={`/cities/${c.state}/${c.city}`}
                          className="flex items-center justify-between py-2.5 px-3
                                     text-sm hover:bg-white rounded-lg transition-colors"
                        >
                          <span className="text-navy font-medium">{c.cityDisplay}</span>
                          <span className="text-gray-400 tabular-nums text-xs">
                            from ${getMinPrice(c).toFixed(2)}/sqft
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
