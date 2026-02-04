'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook, Twitter, MapPin, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const quickLinks = [
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/locations', label: 'Locations' },
  { href: '/contact', label: 'Contact' },
]

const locations = [
  { name: 'Foothill', address: '1847 Foothill Dr' },
  { name: 'Highland', address: '2954 Highland Dr' },
  { name: 'State Street', address: '1720 S State St' },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }
    
    // In production, this would connect to an email service
    setSubscribed(true)
  }

  return (
    <footer className="bg-forest text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="Bjorn's Brew"
                width={50}
                height={50}
                className="bg-white rounded-full p-1"
              />
              <span className="font-heading font-bold text-xl">
                Bjorn&apos;s Brew
              </span>
            </Link>
            <p className="text-beige text-sm leading-relaxed">
              Love Coffee. Love Animals. 🐾
              <br />
              Family-owned coffee shop serving quality coffee while supporting animal charities.
            </p>
            {/* Bjorn tribute */}
            <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=100&q=80"
                  alt="Bjorn"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-xs text-beige">
                In loving memory of Bjorn 🐕<br />
                <span className="text-white/70">The inspiration behind it all</span>
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/bjornsbrew"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/bjornsbrew"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/bjornsbrew"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-beige hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Locations</h3>
            <ul className="space-y-3">
              {locations.map((loc) => (
                <li key={loc.name}>
                  <Link
                    href="/locations"
                    className="flex items-start gap-2 text-beige hover:text-white transition-colors"
                  >
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">{loc.name}</strong>
                      <br />
                      {loc.address}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Stay Connected</h3>
            <p className="text-beige text-sm mb-4">
              Subscribe to get updates on new drinks, events, and special offers.
            </p>
            {subscribed ? (
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-white font-medium text-sm">You&apos;re subscribed!</p>
                <p className="text-beige text-xs mt-1">Check your inbox for a welcome treat ☕</p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20"
                  required
                />
                {error && (
                  <p className="text-red-300 text-xs">{error}</p>
                )}
                <Button type="submit" variant="secondary" className="w-full">
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-beige">
            <p>© 2026 Bjorn&apos;s Brew. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
