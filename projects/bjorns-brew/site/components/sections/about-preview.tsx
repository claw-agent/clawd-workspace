import Image from 'next/image'
import { Button } from '@/components/ui/button'

export function AboutPreview() {
  return (
    <section className="section-padding bg-white relative">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&q=80"
                alt="Inside Bjorn's Brew coffee shop"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-pink rounded-2xl -z-10" />
            {/* Paw print accent */}
            <span className="absolute -top-3 -left-3 text-3xl opacity-20 rotate-[-15deg]">🐾</span>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <span className="text-forest font-medium flex items-center gap-2">
              Our Story <span className="text-sm opacity-60">🐾</span>
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900">
              More Than Just Coffee
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Bjorn&apos;s Brew was born from a love of great coffee and an even greater
              love for our furry friends. Named after Bjorn, our beloved Australian
              Shepherd who inspired our mission, we&apos;re a family-owned coffee shop
              dedicated to serving quality coffee while making a difference.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Every cup you purchase helps support local animal charities.
              It&apos;s our way of honoring Bjorn&apos;s legacy and spreading joy to
              both coffee lovers and animals in need.
            </p>
            {/* Mini Bjorn callout */}
            <div className="flex items-center gap-4 bg-beige-light rounded-xl p-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-forest/20">
                <Image
                  src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&q=80"
                  alt="Bjorn the Australian Shepherd"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-heading font-semibold text-forest">Meet Bjorn 🐕</p>
                <p className="text-sm text-gray-600">The good boy who started it all</p>
              </div>
            </div>
            <Button href="/about">
              Learn Our Story
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
