'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Header from '@/app/components/Header';
import LoadingState from '@/app/components/LoadingState';
import RoofDataCard from '@/app/components/RoofDataCard';
import MaterialGrid from '@/app/components/MaterialGrid';
import ExportButton from '@/app/components/ExportButton';
import ErrorState from '@/app/components/ErrorState';
import ProfitMargin from '@/app/components/ProfitMargin';
import NotesField from '@/app/components/NotesField';
import CustomerQuote from '@/app/components/CustomerQuote';
import DataSourcesSection from '@/app/components/DataSourcesSection';
import RawDataView from '@/app/components/RawDataView';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import type { RoofMeasurement, CityPricing, FullEstimate } from '@/lib/types';

function EstimateContent() {
  const searchParams = useSearchParams();
  const address = searchParams.get('address') || '';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<'not-found' | 'no-solar' | 'api-error' | null>(null);
  const [roofData, setRoofData] = useState<RoofMeasurement | null>(null);
  const [estimate, setEstimate] = useState<FullEstimate | null>(null);
  const [matchedCity, setMatchedCity] = useState<CityPricing | null>(null);
  const [nationalAverages, setNationalAverages] = useState<Record<string, { avg: number; min: number; max: number }>>({});
  const [showQuote, setShowQuote] = useState(false);
  const [markupPct] = useState(25);

  const fetchEstimate = async () => {
    if (!address) return;
    setLoading(true);
    setError(null);

    try {
      const roofRes = await fetch('/api/roof-measure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      });

      if (!roofRes.ok) {
        const errData = await roofRes.json();
        if (roofRes.status === 404) {
          setError(errData.error?.includes('Solar') ? 'no-solar' : 'not-found');
        } else {
          setError('api-error');
        }
        setLoading(false);
        return;
      }

      const roofResult = await roofRes.json();
      setRoofData(roofResult);

      const estimateRes = await fetch('/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roofSqft: roofResult.roofSqft,
          pitchOver12: roofResult.pitchOver12,
          cityName: roofResult.cityName,
          stateName: roofResult.stateName,
          lat: roofResult.lat,
          lng: roofResult.lng,
        }),
      });

      if (estimateRes.ok) {
        const estimateData = await estimateRes.json();
        setEstimate(estimateData.estimate);
        setMatchedCity(estimateData.matchedCity);
        setNationalAverages(estimateData.nationalAverages);
      }
    } catch {
      setError('api-error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEstimate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  if (!address) {
    return (
      <div className="min-h-screen">
        <Header showBack />
        <div className="p-4 text-center text-gray-500 mt-20">No address provided.</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header showBack />
        <LoadingState address={address} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Header showBack />
        <ErrorState type={error} onRetry={fetchEstimate} />
      </div>
    );
  }

  if (!roofData || !estimate) return null;

  return (
    <div className="min-h-screen">
      <Header showBack />

      {/* Print header */}
      <div className="print-only hidden p-6 border-b">
        <h1 className="text-2xl font-bold">XPERIENCE ROOFING</h1>
        <p className="text-sm text-gray-500">Roof Estimate &mdash; {new Date().toLocaleDateString()}</p>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {/* Address confirmation */}
        <div className="reveal-up" style={{ animationDelay: '0ms' }}>
          <p className="text-sm text-gray-500 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
            {roofData.address}
          </p>
        </div>

        {/* Roof data card */}
        <div className="reveal-up" style={{ animationDelay: '150ms' }}>
          <RoofDataCard
            roofData={roofData}
            wasteFactor={estimate.wasteFactor}
            wastePercent={estimate.wastePercent}
            adjustedSqft={estimate.adjustedSqft}
          />
        </div>

        {/* City match info */}
        <div className="reveal-up" style={{ animationDelay: '300ms' }}>
          <p className="text-sm text-gray-500">
            Pricing from <span className="font-medium text-navy">{estimate.city}, {estimate.state}</span>
            {estimate.distanceMiles > 0 && (
              <span className={estimate.distanceMiles > 50 ? 'text-amber-600' : ''}>
                {' '}({estimate.distanceMiles} mi away)
              </span>
            )}
          </p>
          {estimate.distanceMiles > 50 && (
            <div className="bg-amber-50 text-amber-800 rounded-lg p-3 text-sm mt-2 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Pricing data is from {estimate.city} ({estimate.distanceMiles} mi away). Local prices may differ.</span>
            </div>
          )}
        </div>

        {/* Material estimates */}
        <div className="reveal-up" style={{ animationDelay: '450ms' }}>
          <MaterialGrid estimates={estimate.materials} nationalAverages={nationalAverages} />
        </div>

        {/* Profit margin calculator */}
        <div className="reveal-up print-hide" style={{ animationDelay: '600ms' }}>
          <ProfitMargin estimate={estimate} />
        </div>

        {/* Notes */}
        <div className="reveal-up" style={{ animationDelay: '700ms' }}>
          <NotesField />
        </div>

        {/* Export */}
        <div className="reveal-up" style={{ animationDelay: '800ms' }}>
          <ExportButton onGenerateQuote={() => setShowQuote(true)} />
        </div>

        {/* Raw data */}
        {matchedCity && (
          <div className="reveal-up" style={{ animationDelay: '850ms' }}>
            <RawDataView cityData={matchedCity} />
          </div>
        )}

        {/* Data sources */}
        <div className="reveal-up" style={{ animationDelay: '900ms' }}>
          <DataSourcesSection />
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-gray-400 text-center pt-2 pb-8">
          Estimates are approximate. Actual costs vary based on roof complexity,
          material availability, and contractor pricing.
        </p>
      </main>

      {/* Customer quote modal */}
      {showQuote && (
        <CustomerQuote
          roofData={roofData}
          estimate={estimate}
          markupPct={markupPct}
          onClose={() => setShowQuote(false)}
        />
      )}
    </div>
  );
}

export default function EstimatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen"><Header showBack /><div className="p-4 text-center text-gray-400">Loading...</div></div>}>
      <EstimateContent />
    </Suspense>
  );
}
