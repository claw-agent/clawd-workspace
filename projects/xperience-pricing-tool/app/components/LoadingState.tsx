'use client';

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const MESSAGES = [
  'Locating building from satellite imagery',
  'Measuring roof segments',
  'Calculating pitch and surface area',
  'Finding local material pricing',
];

export default function LoadingState({ address }: { address: string }) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMsgIndex(i => (i + 1) % MESSAGES.length);
    }, 1500);
    return () => clearInterval(msgInterval);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setProgress(30), 200);
    const t2 = setTimeout(() => setProgress(55), 1000);
    const t3 = setTimeout(() => setProgress(70), 2000);
    const t4 = setTimeout(() => setProgress(80), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <Loader2 className="w-10 h-10 text-orange spin-slow mb-6" />
      <h2 className="text-xl font-bold text-navy mb-4">Measuring roof...</h2>

      <div className="w-full max-w-xs mb-6">
        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <p className="text-sm text-gray-500 transition-opacity duration-300 min-h-[2rem]">
        {MESSAGES[msgIndex]}
      </p>
      <p className="text-xs text-gray-400 mt-2 max-w-sm truncate">{address}</p>
    </div>
  );
}
