'use client';

import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';
import AddressInput from '@/app/components/AddressInput';
import { useState } from 'react';
import Link from 'next/link';
import { Ruler, Database, Satellite, ArrowRight } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (address: string) => {
    setLoading(true);
    router.push(`/estimate?address=${encodeURIComponent(address)}`);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-md mx-auto px-4 py-12 flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold tracking-tight text-navy md:text-4xl">
          Roof Estimator
        </h1>
        <p className="text-base text-gray-500 mt-2 leading-relaxed">
          Satellite measurements. Local material pricing.
        </p>

        <div className="w-full mt-8">
          <AddressInput onSubmit={handleSubmit} loading={loading} />
        </div>

        <div className="flex items-center gap-3 w-full my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <Link
          href="/cities"
          className="text-navy text-sm font-medium inline-flex items-center gap-1 hover:text-orange transition-colors"
        >
          Browse 982 City Prices <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <div className="mt-10 space-y-2.5 text-sm text-gray-400 w-full max-w-xs">
          <div className="flex items-center gap-2.5">
            <Satellite className="w-4 h-4 text-gray-300 shrink-0" />
            <span>Satellite-measured roof area</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Database className="w-4 h-4 text-gray-300 shrink-0" />
            <span>982 cities with local pricing</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Ruler className="w-4 h-4 text-gray-300 shrink-0" />
            <span>Pitch, segments, waste calculated</span>
          </div>
        </div>
      </main>
    </div>
  );
}
