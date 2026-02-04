'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail } from 'lucide-react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would connect to an email service
    setSubmitted(true)
  }

  return (
    <section className="section-padding bg-beige">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-forest rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>

          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900">
            Stay in the Loop
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Subscribe to get updates on new drinks, seasonal specials, and events.
          </p>

          {submitted ? (
            <div className="mt-8 p-6 bg-forest/10 rounded-xl">
              <p className="text-forest font-medium">
                Thanks for subscribing! Check your inbox for a welcome treat. ☕
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit">Subscribe</Button>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
