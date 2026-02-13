'use client';

import { useState, useRef, useEffect, useCallback, FormEvent } from 'react';
import { MapPin } from 'lucide-react';

interface Props {
  onSubmit: (address: string) => void;
  loading: boolean;
}

declare global {
  interface Window {
    google: typeof google;
    initGooglePlaces: () => void;
  }
}

function loadGoogleMapsScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.google?.maps?.places) {
      resolve();
      return;
    }
    if (document.querySelector('script[src*="maps.googleapis.com"]')) {
      window.initGooglePlaces = () => resolve();
      return;
    }
    window.initGooglePlaces = () => resolve();
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places&callback=initGooglePlaces`;
    script.async = true;
    script.defer = true;
    script.onerror = () => reject(new Error('Failed to load Google Maps'));
    document.head.appendChild(script);
  });
}

export default function AddressInput({ onSubmit, loading }: Props) {
  const [address, setAddress] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const onSubmitRef = useRef(onSubmit);
  onSubmitRef.current = onSubmit;

  const initAutocomplete = useCallback(async () => {
    try {
      await loadGoogleMapsScript();
      if (!inputRef.current || autocompleteRef.current) return;

      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['address'],
        componentRestrictions: { country: 'us' },
        fields: ['formatted_address'],
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place?.formatted_address) {
          setAddress(place.formatted_address);
          onSubmitRef.current(place.formatted_address);
        }
      });

      autocompleteRef.current = autocomplete;
    } catch {
      // Falls back to plain text input
    }
  }, []);

  useEffect(() => {
    initAutocomplete();
  }, [initAutocomplete]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (address.trim()) {
      onSubmit(address.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-3">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full h-14 px-4 pl-10 text-lg bg-white border border-gray-200
                     rounded-md focus:ring-2 focus:ring-orange/50 focus:border-orange
                     placeholder:text-gray-400 outline-none"
          placeholder="Enter property address..."
          disabled={loading}
          autoComplete="off"
        />
      </div>
      <button
        type="submit"
        disabled={loading || !address.trim()}
        className="w-full h-14 bg-orange text-white text-lg font-semibold rounded-lg
                   active:scale-[0.98] transition-transform disabled:opacity-50
                   disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? 'Measuring...' : 'Get Roof Estimate'}
      </button>
    </form>
  );
}
