'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Compass } from 'lucide-react';
import type { RoofMeasurement } from '@/lib/types';

function useAnimatedNumber(target: number, duration = 600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const start = performance.now();
    function update(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }, [target, duration]);
  return value;
}

function azimuthToDirection(deg: number): string {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(deg / 45) % 8];
}

interface Props {
  roofData: RoofMeasurement;
  wasteFactor: number;
  wastePercent: string;
  adjustedSqft: number;
}

export default function RoofDataCard({ roofData, wasteFactor, wastePercent, adjustedSqft }: Props) {
  const animatedSqft = useAnimatedNumber(roofData.roofSqft);
  const [expanded, setExpanded] = useState(false);
  const segments = roofData.segmentDetails || [];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Summary - always visible */}
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-orange mb-3">
          Roof Measurement
        </p>
        <div className="flex items-baseline gap-3">
          <p className="text-4xl font-bold text-navy tabular-nums">
            {animatedSqft.toLocaleString()}
          </p>
          <span className="text-base font-normal text-gray-400">sq ft</span>
        </div>
        <p className="text-sm text-gray-400 mt-1">
          {adjustedSqft.toLocaleString()} sqft with {wastePercent} waste adjustment
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          <div>
            <p className="text-xs text-gray-400 uppercase">Pitch</p>
            <p className="text-base font-semibold text-navy">
              {roofData.pitchOver12}:12
              <span className="text-xs font-normal text-gray-400 ml-1">({roofData.pitchDegrees}&deg;)</span>
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase">Waste</p>
            <p className="text-base font-semibold text-navy">+{wastePercent}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase">Segments</p>
            <p className="text-base font-semibold text-navy">{roofData.segments}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase">Quality</p>
            <p className={`text-base font-semibold ${roofData.quality === 'HIGH' ? 'text-green-600' : 'text-gray-500'}`}>
              {roofData.quality}
            </p>
          </div>
        </div>
      </div>

      {/* Expandable detail section */}
      {segments.length > 0 && (
        <div className="border-t border-gray-100">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between px-5 py-3 text-sm text-gray-500 hover:text-navy hover:bg-gray-50/50 transition-colors cursor-pointer"
          >
            <span className="font-medium">Full Breakdown ({segments.length} segments)</span>
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {expanded && (
            <div className="px-5 pb-5 space-y-4">
              {/* Segment table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-gray-400 uppercase border-b border-gray-100">
                      <th className="pb-2 pr-3">#</th>
                      <th className="pb-2 pr-3">Area</th>
                      <th className="pb-2 pr-3">Pitch</th>
                      <th className="pb-2">Direction</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {segments.map((seg) => (
                      <tr key={seg.index} className="text-navy">
                        <td className="py-2 pr-3 tabular-nums text-gray-400">{seg.index}</td>
                        <td className="py-2 pr-3 tabular-nums font-medium">{seg.areaSqft.toLocaleString()} sqft</td>
                        <td className="py-2 pr-3 tabular-nums">{seg.pitchOver12}:12</td>
                        <td className="py-2">
                          {seg.azimuthDegrees != null ? (
                            <span className="inline-flex items-center gap-1">
                              <Compass className="w-3 h-3 text-gray-400" />
                              {azimuthToDirection(seg.azimuthDegrees)} ({seg.azimuthDegrees}&deg;)
                            </span>
                          ) : (
                            <span className="text-gray-400">&mdash;</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Additional metadata */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-400">
                {roofData.maxSunshineHours && (
                  <span>Max sunshine: {Math.round(roofData.maxSunshineHours).toLocaleString()} hrs/yr</span>
                )}
                {roofData.imageryDate && (
                  <span>Imagery: {roofData.imageryDate.year}-{String(roofData.imageryDate.month).padStart(2, '0')}-{String(roofData.imageryDate.day).padStart(2, '0')}</span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
