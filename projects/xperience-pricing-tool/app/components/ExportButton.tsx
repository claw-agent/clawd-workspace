'use client';

import { useEffect, useState } from 'react';
import { Printer, Share2, FileText } from 'lucide-react';

interface Props {
  onGenerateQuote?: () => void;
}

export default function ExportButton({ onGenerateQuote }: Props) {
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator !== 'undefined' && 'share' in navigator);
  }, []);

  return (
    <div className="space-y-2 no-print">
      <button
        onClick={() => window.print()}
        className="w-full h-11 bg-navy text-white font-semibold rounded-lg
                   flex items-center justify-center gap-2 text-sm
                   active:scale-[0.98] transition-transform cursor-pointer hover:bg-navy-light"
      >
        <Printer className="w-4 h-4" />
        Export Estimate
      </button>
      {onGenerateQuote && (
        <button
          onClick={onGenerateQuote}
          className="w-full h-11 bg-orange text-white font-semibold rounded-lg
                     flex items-center justify-center gap-2 text-sm
                     active:scale-[0.98] transition-transform cursor-pointer hover:bg-orange/90"
        >
          <FileText className="w-4 h-4" />
          Generate Customer Quote
        </button>
      )}
      {canShare && (
        <button
          onClick={async () => {
            try {
              await navigator.share({
                title: 'Roof Estimate — XPERIENCE Roofing',
                url: window.location.href,
              });
            } catch { /* cancelled */ }
          }}
          className="w-full h-11 bg-white text-navy font-semibold rounded-lg
                     border border-gray-200 flex items-center justify-center gap-2 text-sm
                     active:scale-[0.98] transition-transform cursor-pointer hover:bg-gray-50"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
      )}
    </div>
  );
}
