'use client'

import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export function SeasonalBanner() {
  return (
    <section className="bg-gradient-to-r from-forest to-forest-dark py-4">
      <div className="container-custom">
        <Link
          href="/menu"
          className="flex items-center justify-center gap-3 text-white hover:opacity-90 transition-opacity"
        >
          <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
          <span className="text-sm md:text-base font-medium">
            <span className="hidden sm:inline">❄️ </span>
            <strong>NEW:</strong> Try our Winter Spiced Mocha — brown sugar, cinnamon &amp; a hint of orange
            <span className="hidden sm:inline"> ☕❄️</span>
          </span>
          <span className="text-xs bg-white/20 px-2 py-1 rounded-full hidden md:inline">
            Limited Time
          </span>
          <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
        </Link>
      </div>
    </section>
  )
}
