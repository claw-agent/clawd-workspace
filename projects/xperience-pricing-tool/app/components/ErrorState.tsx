'use client';

import { MapPin, Satellite, AlertTriangle } from 'lucide-react';

interface Props {
  type: 'not-found' | 'no-solar' | 'api-error';
  onRetry: () => void;
  cityName?: string;
}

const configs = {
  'not-found': {
    Icon: MapPin,
    title: 'Address not found',
    message: "Could not locate that address. Try including city and state, or check for typos.",
  },
  'no-solar': {
    Icon: Satellite,
    title: 'Satellite data unavailable',
    message: "Google Solar imagery doesn't cover this area. Common in rural locations.",
  },
  'api-error': {
    Icon: AlertTriangle,
    title: 'Measurement failed',
    message: "Could not measure this roof. This is usually temporary — try again.",
  },
};

export default function ErrorState({ type, onRetry }: Props) {
  const config = configs[type];
  const Icon = config.Icon;

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
      <Icon className="w-10 h-10 text-gray-300 mb-4" />
      <h2 className="text-lg font-semibold text-navy mb-2">{config.title}</h2>
      <p className="text-sm text-gray-500 max-w-sm mb-6">{config.message}</p>
      <div className="space-y-3 w-full max-w-xs">
        <button
          onClick={onRetry}
          className="w-full h-12 bg-orange text-white font-semibold rounded-lg
                     active:scale-[0.98] transition-transform cursor-pointer"
        >
          Try Again
        </button>
        <a
          href="/cities"
          className="block w-full h-12 leading-[3rem] text-center text-navy font-medium
                     rounded-lg border border-gray-200 hover:bg-gray-50"
        >
          Browse City Prices
        </a>
      </div>
    </div>
  );
}
