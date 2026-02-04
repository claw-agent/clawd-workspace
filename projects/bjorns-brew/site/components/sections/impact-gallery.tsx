import Image from 'next/image'
import { Heart, DollarSign, Users } from 'lucide-react'
import { PawDivider } from '@/components/ui/paw-divider'

const charityPartners = [
  {
    name: 'Best Friends Animal Society',
    description: 'The nation\'s largest no-kill sanctuary for companion animals',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&q=80',
    impact: '$65K+ donated',
  },
  {
    name: 'Utah Humane Society',
    description: 'Rescuing, rehabilitating and rehoming animals since 1960',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80',
    impact: '$58K+ donated',
  },
  {
    name: 'Nuzzles & Co.',
    description: 'Pet rescue and adoption bringing families together',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80',
    impact: '$60K+ donated',
  },
]

const impactStats = [
  { icon: DollarSign, value: '$183K+', label: 'Total Donated' },
  { icon: Heart, value: '500+', label: 'Animals Helped' },
  { icon: Users, value: '3', label: 'Charity Partners' },
]

export function ImpactGallery() {
  return (
    <section className="section-padding bg-beige-light relative overflow-hidden">
      {/* Subtle background paw prints */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-10 left-[5%] text-8xl rotate-[-15deg]">🐾</div>
        <div className="absolute top-1/3 right-[8%] text-7xl rotate-[20deg]">🐾</div>
        <div className="absolute bottom-20 left-[15%] text-6xl rotate-[-10deg]">🐾</div>
        <div className="absolute bottom-1/4 right-[20%] text-8xl rotate-[5deg]">🐾</div>
      </div>

      <div className="container-custom relative">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-forest font-medium">Our Impact</span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mt-2">
            Animals We&apos;ve Helped 🐾
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Every cup of coffee you enjoy helps us support these incredible organizations 
            working to give animals a second chance at life.
          </p>
        </div>

        {/* Big Impact Stat */}
        <div className="bg-forest text-white rounded-3xl p-8 md:p-12 mb-12 text-center relative overflow-hidden">
          {/* Decorative paws */}
          <span className="absolute top-4 left-6 text-3xl opacity-20">🐾</span>
          <span className="absolute bottom-4 right-6 text-3xl opacity-20">🐾</span>
          
          <p className="text-pink font-medium mb-2">Since 2018</p>
          <p className="font-heading font-bold text-5xl md:text-7xl mb-4">$183,000+</p>
          <p className="text-beige text-xl">Donated to Animal Charities</p>
          
          <div className="flex flex-wrap justify-center gap-8 mt-8 pt-8 border-t border-white/20">
            {impactStats.slice(1).map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-8 h-8 text-pink mx-auto mb-2" />
                <p className="font-heading font-bold text-2xl">{stat.value}</p>
                <p className="text-beige text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partner Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {charityPartners.map((partner) => (
            <div 
              key={partner.name}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow relative group"
            >
              {/* Paw print accent */}
              <PawDivider variant="corner" className="top-4 right-4 group-hover:opacity-60 transition-opacity" color="pink" />
              
              <div className="relative aspect-[4/3]">
                <Image
                  src={partner.image}
                  alt={partner.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="bg-pink text-forest-dark text-sm font-medium px-3 py-1 rounded-full">
                    {partner.impact}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-heading font-semibold text-xl text-gray-900 mb-2">
                  {partner.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {partner.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <PawDivider variant="scattered" className="mt-12" />

        {/* Call to Action */}
        <p className="text-center text-gray-600 mt-4">
          <Heart className="w-5 h-5 inline text-pink mr-2" />
          Thank you for being part of our mission. Every sip makes a difference!
        </p>
      </div>
    </section>
  )
}
