'use client';

import { X } from 'lucide-react';
import type { RoofMeasurement, FullEstimate } from '@/lib/types';

interface Props {
  roofData: RoofMeasurement;
  estimate: FullEstimate;
  markupPct: number;
  onClose: () => void;
}

function fmt(n: number): string {
  return '$' + Math.round(n).toLocaleString('en-US');
}

export default function CustomerQuote({ roofData, estimate, markupPct, onClose }: Props) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-start justify-center overflow-y-auto p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full my-8 shadow-xl">
        {/* Header - hidden on print */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 no-print">
          <h2 className="font-bold text-navy">Customer Quote Preview</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-orange text-white text-sm font-semibold rounded-lg cursor-pointer hover:bg-orange/90"
            >
              Print / Save PDF
            </button>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Quote content */}
        <div className="p-8 space-y-6">
          <div className="text-center border-b border-gray-200 pb-6">
            <h1 className="text-2xl font-bold text-navy">XPERIENCE ROOFING</h1>
            <p className="text-sm text-gray-400 mt-1">Roof Estimate &mdash; {new Date().toLocaleDateString()}</p>
          </div>

          <div>
            <p className="text-xs uppercase text-gray-400 font-semibold mb-1">Property</p>
            <p className="text-navy font-medium">{roofData.address}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50 rounded-lg p-4">
            <div>
              <p className="text-xs text-gray-400 uppercase">Roof Area</p>
              <p className="font-semibold text-navy">{roofData.roofSqft.toLocaleString()} sqft</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">Adjusted Area</p>
              <p className="font-semibold text-navy">{estimate.adjustedSqft.toLocaleString()} sqft</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">Pitch</p>
              <p className="font-semibold text-navy">{roofData.pitchOver12}:12</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">Segments</p>
              <p className="font-semibold text-navy">{roofData.segments}</p>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase text-gray-400 font-semibold mb-3">Material Options</p>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200 text-left">
                  <th className="pb-2 pr-3 text-xs uppercase text-gray-400">Material</th>
                  <th className="pb-2 pr-3 text-right text-xs uppercase text-gray-400">Rate</th>
                  <th className="pb-2 text-right text-xs uppercase text-gray-400">Estimated Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {estimate.materials.map((mat) => {
                  const baseCost = mat.totalHigh || mat.materialCost;
                  const customerPrice = baseCost * (1 + markupPct / 100);
                  const perSqft = mat.costPerSqft * (1 + markupPct / 100);
                  return (
                    <tr key={mat.materialKey}>
                      <td className="py-3 pr-3 font-medium text-navy">{mat.displayName}</td>
                      <td className="py-3 pr-3 text-right tabular-nums">${perSqft.toFixed(2)}/sqft</td>
                      <td className="py-3 text-right tabular-nums font-bold text-navy">{fmt(customerPrice)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="text-xs text-gray-400 border-t border-gray-200 pt-4 space-y-1">
            <p>This estimate is based on satellite roof measurements and local material pricing.</p>
            <p>Final pricing may vary based on roof condition, material availability, and complexity.</p>
            <p className="mt-2 font-medium text-gray-500">XPERIENCE Roofing &bull; Contact for a detailed in-person quote</p>
          </div>
        </div>
      </div>
    </div>
  );
}
