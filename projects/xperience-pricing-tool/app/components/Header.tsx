'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ArrowLeft } from 'lucide-react';

export default function Header({ showBack = false }: { showBack?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-navy text-white h-14 flex items-center px-4 sticky top-0 z-50 no-print">
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <Link href="/" className="text-white/70 hover:text-white transition-colors mr-1">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          )}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">XPERIENCE</span>
            <span className="text-white/60 text-sm font-medium hidden sm:inline">ROOFING</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-white/70 hover:text-white transition-colors">Home</Link>
          <Link href="/cities" className="text-white/70 hover:text-white transition-colors">City Prices</Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-14 left-0 right-0 bg-navy border-t border-white/10 md:hidden z-50">
          <Link href="/" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5">Home</Link>
          <Link href="/cities" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5">City Prices</Link>
        </div>
      )}
    </nav>
  );
}
