'use client';

import type { MaterialEstimate } from '@/lib/types';

interface Props {
  estimate: MaterialEstimate;
  isCheapest: boolean;
  nationalAvg: number | null;
}

function fmt(n: number): string {
  return '$' + n.toLocaleString('en-US');
}

export default function MaterialCard({ estimate, isCheapest, nationalAvg }: Props) {
  const percentVsNational = nationalAvg
    ? Math.round(((estimate.costPerSqft - nationalAvg) / nationalAvg) * 100)
    : null;

  return (
    <div className="material-card bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      {isCheapest && (
        <span className="inline-block px-2 py-0.5 text-xs font-semibold bg-green-50 text-green-700 rounded-full mb-2">
          Best Value
        </span>
      )}
      <div className="flex items-baseline justify-between">
        <h3 className="text-lg font-bold text-navy">{estimate.displayName}</h3>
        <div className="text-right">
          <span className="text-sm text-gray-400 tabular-nums">{fmt(estimate.costPerSqft)}/sqft</span>
          <span className="text-xs text-gray-300 tabular-nums ml-2">{fmt(estimate.costPerSquare)}/sq</span>
        </div>
      </div>

      {/* Cost breakdown table */}
      <div className="mt-4 space-y-1.5">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Material</span>
          <span className="font-semibold text-navy tabular-nums">{fmt(estimate.materialOnlyCost)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Waste ({Math.round((estimate.wasteCost / (estimate.materialOnlyCost || 1)) * 100)}%)</span>
          <span className="font-semibold text-navy tabular-nums">{fmt(estimate.wasteCost)}</span>
        </div>
        {estimate.laborCostLow ? (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Labor</span>
            <span className="font-semibold text-navy tabular-nums">
              {fmt(estimate.laborCostLow)} &ndash; {fmt(estimate.laborCostHigh!)}
            </span>
          </div>
        ) : (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Labor</span>
            <span className="text-gray-400 italic text-xs">Not available for area</span>
          </div>
        )}
      </div>

      <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between items-baseline">
        <span className="text-sm font-medium text-gray-500">Total</span>
        <span className="text-xl font-bold text-navy tabular-nums">
          {estimate.totalLow
            ? `${fmt(estimate.totalLow)} \u2013 ${fmt(estimate.totalHigh!)}`
            : fmt(estimate.materialCost)
          }
        </span>
      </div>

      {percentVsNational !== null && (
        <div className="mt-3">
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${percentVsNational < 0 ? 'bg-green-500' : 'bg-orange'}`}
              style={{ width: `${Math.min(Math.abs(percentVsNational) + 50, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {Math.abs(percentVsNational)}% {percentVsNational < 0 ? 'below' : 'above'} national avg
          </p>
        </div>
      )}
    </div>
  );
}
