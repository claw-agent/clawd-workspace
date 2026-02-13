'use client';

import { useState } from 'react';
import { Table, ChevronDown } from 'lucide-react';
import type { CityPricing } from '@/lib/types';

function fmt(n: number): string {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function RawDataView({ cityData }: { cityData: CityPricing }) {
  const [open, setOpen] = useState(false);
  const materials = Object.entries(cityData.materials);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-navy">
          <Table className="w-4 h-4 text-orange" />
          View Raw Data
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-4 border-t border-gray-100 pt-4">
          {/* City metadata */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-orange mb-2">
              City Details
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-50">
                  <tr>
                    <td className="py-2 pr-4 text-gray-400 font-medium whitespace-nowrap">City</td>
                    <td className="py-2 font-semibold text-navy">{cityData.cityDisplay}, {cityData.stateDisplay}</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-gray-400 font-medium whitespace-nowrap">Slug</td>
                    <td className="py-2 text-navy font-mono text-xs">{cityData.state}/{cityData.city}</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-gray-400 font-medium whitespace-nowrap">Avg Roof Size</td>
                    <td className="py-2 text-navy tabular-nums">{cityData.avgRoofSizeSqft.toLocaleString()} sqft</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-gray-400 font-medium whitespace-nowrap">Avg Pitch</td>
                    <td className="py-2 text-navy">{cityData.avgPitch}</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-gray-400 font-medium whitespace-nowrap">Roofs Scanned</td>
                    <td className="py-2 text-navy tabular-nums">{cityData.roofsScanned.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-gray-400 font-medium whitespace-nowrap">Last Updated</td>
                    <td className="py-2 text-navy">{cityData.lastUpdated}</td>
                  </tr>
                  {cityData.laborCostRange && (
                    <tr>
                      <td className="py-2 pr-4 text-gray-400 font-medium whitespace-nowrap">Labor Range</td>
                      <td className="py-2 text-navy tabular-nums">
                        {fmt(cityData.laborCostRange.low)} &ndash; {fmt(cityData.laborCostRange.high)} / sqft
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Materials table */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-orange mb-2">
              All Materials
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left">
                    <th className="py-2 pr-4 text-xs text-gray-400 uppercase font-semibold">Key</th>
                    <th className="py-2 pr-4 text-xs text-gray-400 uppercase font-semibold">Display Name</th>
                    <th className="py-2 pr-4 text-xs text-gray-400 uppercase font-semibold text-right">Cost/Sqft</th>
                    <th className="py-2 text-xs text-gray-400 uppercase font-semibold text-right">Cost/Square</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {materials.map(([key, mat]) => (
                    <tr key={key}>
                      <td className="py-2 pr-4 font-mono text-xs text-gray-500">{key}</td>
                      <td className="py-2 pr-4 font-semibold text-navy">{mat.displayName}</td>
                      <td className="py-2 pr-4 text-right tabular-nums">{fmt(mat.costPerSqft)}</td>
                      <td className="py-2 text-right tabular-nums">{fmt(mat.costPerSquare)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
