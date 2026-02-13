import type { CityPricing, MaterialEstimate, FullEstimate } from './types';

export function getWasteFactor(pitchOver12: number): number {
  if (pitchOver12 <= 4) return 0.05;
  if (pitchOver12 <= 7) return 0.10;
  if (pitchOver12 <= 9) return 0.12;
  if (pitchOver12 <= 12) return 0.15;
  return 0.20;
}

export function calculateEstimate(
  roofSqft: number,
  pitchOver12: number,
  city: CityPricing,
  distanceMiles: number,
): FullEstimate {
  const wasteFactor = getWasteFactor(pitchOver12);
  const adjustedSqft = Math.round(roofSqft * (1 + wasteFactor));

  const materials: MaterialEstimate[] = Object.entries(city.materials).map(
    ([key, mat]) => {
      const baseMaterialCost = roofSqft * mat.costPerSqft;
      const wasteCost = (adjustedSqft - roofSqft) * mat.costPerSqft;
      const materialCost = adjustedSqft * mat.costPerSqft;
      const labor = city.laborCostRange;
      const laborLow = labor ? adjustedSqft * labor.low : null;
      const laborHigh = labor ? adjustedSqft * labor.high : null;

      return {
        materialKey: key,
        displayName: mat.displayName,
        costPerSqft: mat.costPerSqft,
        costPerSquare: mat.costPerSquare,
        materialCost: Math.round(materialCost),
        laborCostLow: laborLow ? Math.round(laborLow) : null,
        laborCostHigh: laborHigh ? Math.round(laborHigh) : null,
        wasteCost: Math.round(wasteCost),
        totalLow: laborLow ? Math.round(materialCost + laborLow) : null,
        totalHigh: laborHigh ? Math.round(materialCost + laborHigh) : null,
        materialOnlyCost: Math.round(baseMaterialCost),
      };
    }
  );

  materials.sort((a, b) => a.materialCost - b.materialCost);

  return {
    roofSqft,
    adjustedSqft,
    pitchOver12,
    wasteFactor,
    wastePercent: `${Math.round(wasteFactor * 100)}%`,
    city: city.cityDisplay,
    state: city.stateDisplay,
    distanceMiles,
    materials,
  };
}

export function formatCurrency(value: number): string {
  return '$' + value.toLocaleString('en-US');
}
