import type { Metadata } from 'next'
import { LocationCard } from '@/components/cards/location-card'
import { locations } from '@/lib/data/locations'
import { MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Locations',
  description: "Find Bjorn's Brew locations in Salt Lake City. Three convenient spots in Foothill, Highland, and State Street.",
}

export default function LocationsPage() {
  return (
    <>
      {/* Hero with Map */}
      <section className="pt-32 pb-16 bg-beige-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-gray-900">
              Our Locations
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Three convenient locations across Salt Lake City.
              Stop by and say hi — we&apos;d love to see you!
            </p>
          </div>

          {/* Map Embed */}
          <div className="relative aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96901.39573859842!2d-111.94895584179686!3d40.7607793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8752f507f5dd8b49%3A0xb6f65ab87e76f28!2sSalt%20Lake%20City%2C%20UT!5e0!3m2!1sen!2sus!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bjorn's Brew Locations Map"
              className="absolute inset-0"
            />
          </div>
        </div>
      </section>

      {/* Location Cards */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-beige-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900">
              What to Expect
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Every Bjorn&apos;s Brew location offers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { emoji: '☕', title: 'Premium Coffee', desc: 'Expertly roasted beans, carefully prepared' },
              { emoji: '🐕', title: 'Dog-Friendly', desc: 'Bring your furry friend (free pup cups!)' },
              { emoji: '📶', title: 'Free Wi-Fi', desc: 'Work or browse while you sip' },
              { emoji: '🥐', title: 'Fresh Pastries', desc: 'Baked goods delivered fresh daily' },
            ].map((feature) => (
              <div
                key={feature.title}
                className="text-center p-6 bg-white rounded-xl shadow-sm"
              >
                <span className="text-4xl mb-4 block">{feature.emoji}</span>
                <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-forest text-center">
        <div className="container-custom">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MapPin className="w-8 h-8 text-pink" />
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-white">
              Can&apos;t Find Us?
            </h2>
          </div>
          <p className="text-beige mb-8 max-w-xl mx-auto">
            Have questions about a specific location? We&apos;re here to help!
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-forest font-semibold rounded-lg hover:bg-beige transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </>
  )
}
