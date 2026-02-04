'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/locations', label: 'Locations' },
  { href: '/contact', label: 'Contact' },
]

export function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-cream/95 backdrop-blur-sm',
        isScrolled && 'shadow-md'
      )}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/images/logo.png"
              alt="Bjorn's Brew"
              width={50}
              height={50}
              className="group-hover:scale-105 transition-transform"
            />
            <span className="font-heading font-bold text-xl text-forest">
              Bjorn&apos;s Brew
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'font-medium transition-colors hover:text-forest',
                  pathname === link.href
                    ? 'text-forest border-b-2 border-forest'
                    : 'text-gray-700'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Find Us Button */}
          <div className="hidden md:block">
            <Button href="/locations" size="sm">
              Find Us
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-forest"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-cream shadow-lg border-t border-beige animate-fade-in">
            <div className="flex flex-col p-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'font-medium py-2 px-4 rounded-lg transition-colors',
                    pathname === link.href
                      ? 'bg-forest text-white'
                      : 'text-gray-700 hover:bg-beige-light'
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button href="/locations" className="w-full mt-4">
                Find Us
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
