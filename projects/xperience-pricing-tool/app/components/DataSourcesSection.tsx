'use client';

import { useState } from 'react';
import { Database, ChevronDown, Info, Globe, Satellite } from 'lucide-react';

export default function DataSourcesSection() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-navy">
          <Database className="w-4 h-4 text-orange" />
          Data Sources &amp; Methodology
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-4 text-sm text-gray-600 border-t border-gray-100 pt-4">
          <div className="flex items-start gap-3">
            <Globe className="w-4 h-4 text-orange shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-navy">Pricing Data</p>
              <p>
                Sourced from{' '}
                <a
                  href="https://instantroofer.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange hover:underline"
                >
                  Instant Roofer
                </a>{' '}
                — contractor-sourced pricing across 982 cities in all 50 states.
              </p>
              <p className="text-xs text-gray-400 mt-1">Last updated: February 9, 2026</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Satellite className="w-4 h-4 text-orange shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-navy">Roof Measurements</p>
              <p>
                Google Solar API — satellite imagery combined with ML analysis to calculate
                roof area, pitch, and segment details.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Info className="w-4 h-4 text-orange shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-navy">Data Points</p>
              <p>
                Cost per sqft, cost per square, average roof size, average pitch,
                roofs scanned, and labor cost ranges for each city and material type.
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-400 border-t border-gray-50 pt-3">
            Pricing varies by contractor and market conditions. These figures represent
            market averages and should be used as estimates, not guarantees.
          </p>
        </div>
      )}
    </div>
  );
}
