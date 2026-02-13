'use client';

import type { MaterialEstimate } from '@/lib/types';
import MaterialCard from './MaterialCard';

interface Props {
  estimates: MaterialEstimate[];
  nationalAverages: Record<string, { avg: number; min: number; max: number }>;
}

export default function MaterialGrid({ estimates, nationalAverages }: Props) {
  if (estimates.length === 0) {
    return (
      <p className="text-gray-400 text-center py-8">No pricing data available.</p>
    );
  }

  const cheapestKey = estimates.reduce((min, e) =>
    e.materialCost < min.materialCost ? e : min
  ).materialKey;

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-orange">
        Material Estimates
      </p>
      <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0 xl:grid-cols-3">
        {estimates.map((est, i) => (
          <div
            key={est.materialKey}
            className="reveal-up"
            style={{ animationDelay: `${(i + 3) * 150}ms` }}
          >
            <MaterialCard
              estimate={est}
              isCheapest={est.materialKey === cheapestKey}
              nationalAvg={nationalAverages[est.materialKey]?.avg || null}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
