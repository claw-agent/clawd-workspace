import type { Metadata } from 'next'
import Image from 'next/image'
import { Heart, Coffee, Users, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ImpactGallery } from '@/components/sections/impact-gallery'
import { CommunityDogs } from '@/components/sections/community-dogs'
import { PawDivider } from '@/components/ui/paw-divider'

export const metadata: Metadata = {
  title: 'About',
  description: "Learn about Bjorn's Brew, our story, and our mission to serve great coffee while supporting animal charities.",
}

const charityPartners = [
  { name: 'Best Friends Animal Society', logo: '🐕' },
  { name: 'Utah Humane Society', logo: '🐱' },
  { name: 'Nuzzles & Co.', logo: '🐾' },
]

const timeline = [
  { year: '2018', title: 'The Dream Begins', description: 'Founded by a family of coffee lovers and animal advocates 🐾' },
  { year: '2019', title: 'First Location Opens', description: 'Foothill location welcomes its first customers' },
  { year: '2020', title: 'Growing the Pack', description: 'Highland location opens to serve more of SLC' },
  { year: '2022', title: 'State Street Launch', description: 'Third location brings Bjorn\'s to even more neighbors' },
  { year: '2024', title: '$100K Milestone', description: 'Reaching six figures in charitable donations!' },
  { year: '2025', title: '$183K+ Donated', description: 'Continuing our mission to help animals in need 🐕' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pb-32 bg-beige-light overflow-hidden">
        {/* Background paw prints */}
        <div className="absolute inset-0 pointer-events-none">
          <span className="absolute top-20 right-[10%] text-8xl text-forest/5 rotate-[-15deg]">🐾</span>
          <span className="absolute bottom-10 left-[5%] text-7xl text-forest/5 rotate-[20deg]">🐾</span>
        </div>

        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-forest font-medium flex items-center gap-2">
                Our Story <span className="text-sm">🐾</span>
              </span>
              <h1 className="font-heading font-bold text-4xl md:text-5xl text-gray-900 mt-2">
                More Than Just a Coffee Shop
              </h1>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Bjorn&apos;s Brew was founded on a simple belief: that a great cup
                of coffee can do more than just brighten your morning — it can
                make a real difference in the world.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                We&apos;re a family-owned coffee shop in Salt Lake City, committed
                to serving exceptional coffee while supporting the animals we love.
              </p>
            </div>

            <div className="relative">
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=800&q=80"
                  alt="Coffee being prepared at Bjorn's Brew"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-pink rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Meet Bjorn */}
      <section className="section-padding bg-white relative">
        {/* Subtle corner paw */}
        <span className="absolute top-8 right-8 text-4xl text-forest/10 rotate-[15deg]">🐾</span>
        
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative aspect-square rounded-2xl overflow-hidden max-w-md mx-auto lg:mx-0 ring-4 ring-pink/30">
                <Image
                  src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80"
                  alt="Bjorn the Australian Shepherd"
                  fill
                  className="object-cover"
                />
                {/* Photo label */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-forest font-medium text-sm">🐾 Bjorn (2012-2023)</span>
                </div>
              </div>
              {/* Decorative paw trail */}
              <div className="flex justify-center gap-2 mt-4 opacity-30">
                <span className="text-lg">🐾</span>
                <span className="text-xl">🐾</span>
                <span className="text-lg">🐾</span>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-6">
              <span className="text-forest font-medium flex items-center gap-2">
                Our Namesake <span>🐕</span>
              </span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900">
                Meet Bjorn
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Bjorn was more than just a pet — he was family. Our beloved
                Australian Shepherd had the kind of spirit that made everyone
                smile. His unconditional love and joyful presence inspired us
                to create something meaningful.
              </p>
              <p className="text-gray-600 leading-relaxed">
                When we opened our first coffee shop, there was no question
                what to name it. Bjorn&apos;s Brew honors his memory and continues
                his legacy of spreading joy and love — especially to animals
                in need.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Every cup you buy helps support local animal charities.
                It&apos;s our way of keeping Bjorn&apos;s spirit alive and helping
                other furry friends find their forever homes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PawDivider variant="scattered" />

      {/* Timeline */}
      <section className="section-padding bg-beige-light relative overflow-hidden">
        {/* Background decoration */}
        <span className="absolute top-1/4 right-[5%] text-7xl text-forest/5 rotate-[25deg]">🐾</span>
        <span className="absolute bottom-1/4 left-[8%] text-6xl text-forest/5 rotate-[-15deg]">🐾</span>

        <div className="container-custom relative">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900">
              Our Journey 🐾
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              From a dream to three locations and counting
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <div key={item.year} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-forest rounded-full flex items-center justify-center text-white font-bold">
                    {item.year}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-forest/20 mt-4 relative">
                      {/* Paw print on timeline */}
                      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs opacity-30">🐾</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 pt-3">
                  <h3 className="font-heading font-semibold text-xl text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="section-padding bg-forest text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl">
              Our Mission
            </h2>
            <p className="mt-4 text-xl text-beige max-w-2xl mx-auto">
              Love Coffee. Love Animals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Coffee, title: 'Quality Coffee', desc: 'Carefully sourced and expertly roasted beans' },
              { icon: Heart, title: 'Give Back', desc: 'Every purchase supports animal charities' },
              { icon: Users, title: 'Community', desc: 'A welcoming space for neighbors to gather' },
              { icon: Award, title: 'Excellence', desc: 'Committed to the best in every cup' },
            ].map((value) => (
              <div key={value.title} className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-pink" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-2">
                  {value.title}
                </h3>
                <p className="text-beige text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Gallery - Full Section */}
      <ImpactGallery />

      {/* Community Dogs */}
      <CommunityDogs />

      <PawDivider variant="line" className="bg-white" />

      {/* CTA */}
      <section className="section-padding bg-pink-light">
        <div className="container-custom text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900">
            Come Visit Us
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
            Stop by any of our three locations and experience the
            Bjorn&apos;s Brew difference for yourself.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/locations" size="lg">
              Find a Location
            </Button>
            <Button href="/menu" variant="outline" size="lg">
              View Our Menu
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
