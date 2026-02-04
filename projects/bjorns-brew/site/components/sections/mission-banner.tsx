import { Heart, Coffee, Users, Dog } from 'lucide-react'

const stats = [
  {
    icon: Coffee,
    value: '100K+',
    label: 'Cups Served',
  },
  {
    icon: Heart,
    value: '$183K+',
    label: 'Donated to Animal Charities',
  },
  {
    icon: Users,
    value: '3',
    label: 'Locations in SLC',
  },
  {
    icon: Dog,
    value: '5000+',
    label: 'Pup Cups Given',
  },
]

export function MissionBanner() {
  return (
    <section className="bg-forest py-16 md:py-20 relative overflow-hidden">
      {/* Subtle background paw prints */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute top-6 left-[10%] text-5xl text-white/5 rotate-[-15deg]">🐾</span>
        <span className="absolute bottom-8 right-[15%] text-6xl text-white/5 rotate-[20deg]">🐾</span>
        <span className="absolute top-1/2 left-[5%] text-4xl text-white/5 rotate-[10deg]">🐾</span>
        <span className="absolute top-1/3 right-[8%] text-5xl text-white/5 rotate-[-10deg]">🐾</span>
      </div>

      <div className="container-custom relative">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white flex items-center justify-center gap-3">
            <span>🐾</span>
            Love Coffee. Love Animals.
            <span>🐾</span>
          </h2>
          <p className="mt-4 text-lg text-beige max-w-2xl mx-auto">
            Every cup you buy helps support local animal charities.
            Together, we&apos;re making a difference — one sip at a time.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-pink" />
              </div>
              <p className="font-heading font-bold text-3xl md:text-4xl text-white">
                {stat.value}
              </p>
              <p className="text-beige text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
