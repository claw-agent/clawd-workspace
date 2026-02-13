'use client';

import { useState } from 'react';
import type { FullEstimate } from '@/lib/types';

interface Props {
  estimate: FullEstimate;
}

function fmt(n: number): string {
  return '$' + Math.round(n).toLocaleString('en-US');
}

export default function ProfitMargin({ estimate }: Props) {
  const [markupPct, setMarkupPct] = useState(25);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-orange mb-3">
        Profit Calculator
      </p>

      <div className="flex items-center gap-3 mb-4">
        <label className="text-sm text-gray-500 whitespace-nowrap">Markup %</label>
        <input
          type="range"
          min={0}
          max={100}
          value={markupPct}
          onChange={(e) => setMarkupPct(Number(e.target.value))}
          className="flex-1 accent-orange"
        />
        <input
          type="number"
          min={0}
          max={200}
          value={markupPct}
          onChange={(e) => setMarkupPct(Math.max(0, Number(e.target.value)))}
          className="w-16 h-9 text-center text-sm font-semibold border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-orange/50 tabular-nums"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-400 uppercase border-b border-gray-100">
              <th className="pb-2 pr-3">Material</th>
              <th className="pb-2 pr-3 text-right">Your Cost</th>
              <th className="pb-2 pr-3 text-right">Customer Price</th>
              <th className="pb-2 text-right">Profit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {estimate.materials.map((mat) => {
              const baseCost = mat.totalHigh || mat.materialCost;
              const customerPrice = baseCost * (1 + markupPct / 100);
              const profit = customerPrice - baseCost;
              return (
                <tr key={mat.materialKey}>
                  <td className="py-2 pr-3 font-medium text-navy">{mat.displayName}</td>
                  <td className="py-2 pr-3 text-right tabular-nums">{fmt(baseCost)}</td>
                  <td className="py-2 pr-3 text-right tabular-nums font-semibold text-navy">{fmt(customerPrice)}</td>
                  <td className="py-2 text-right tabular-nums text-green-600 font-semibold">{fmt(profit)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
