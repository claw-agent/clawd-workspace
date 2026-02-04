import Image from 'next/image'
import { Camera, Heart, Coffee } from 'lucide-react'
import { PawDivider } from '@/components/ui/paw-divider'

const communityPups = [
  {
    name: 'Luna',
    breed: 'Golden Retriever',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80',
    favoriteDrink: 'Pup Cup (extra whipped cream!)',
  },
  {
    name: 'Max',
    breed: 'French Bulldog',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&q=80',
    favoriteDrink: 'Puppuccino',
  },
  {
    name: 'Bella',
    breed: 'Labrador Mix',
    image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&q=80',
    favoriteDrink: 'Water bowl with ice',
  },
  {
    name: 'Cooper',
    breed: 'Australian Shepherd',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80',
    favoriteDrink: 'Pup Cup',
  },
  {
    name: 'Daisy',
    breed: 'Corgi',
    image: 'https://images.unsplash.com/photo-1612536057832-2ff7ead58194?w=600&q=80',
    favoriteDrink: 'Mini Pup Cup',
  },
  {
    name: 'Charlie',
    breed: 'Bernese Mountain Dog',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80',
    favoriteDrink: 'Large Pup Cup',
  },
]

export function CommunityDogs() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-forest font-medium flex items-center justify-center gap-2">
            <span>🐾</span> Community <span>🐾</span>
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900 mt-2">
            Pups of Bjorn&apos;s
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Meet some of the adorable regulars who visit us with their humans. 
            We&apos;re always excited to see a furry face!
          </p>
        </div>

        {/* Dog Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {communityPups.map((pup) => (
            <div 
              key={pup.name}
              className="group relative rounded-2xl overflow-hidden bg-beige-light"
            >
              <div className="relative aspect-square">
                <Image
                  src={pup.image}
                  alt={`${pup.name} the ${pup.breed}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Hover info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform">
                  <p className="font-heading font-semibold text-lg">{pup.name}</p>
                  <p className="text-white/80 text-sm">{pup.breed}</p>
                  <p className="text-pink text-xs mt-1 flex items-center gap-1">
                    <Coffee className="w-3 h-3" />
                    {pup.favoriteDrink}
                  </p>
                </div>
              </div>
              
              {/* Always visible name tag */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-forest">{pup.name}</span>
              </div>
              
              {/* Heart icon */}
              <div className="absolute top-3 right-3 w-8 h-8 bg-pink/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
            </div>
          ))}
        </div>

        <PawDivider variant="line" className="mt-12" />

        {/* Dog-Friendly CTA */}
        <div className="mt-8 bg-pink-light rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          {/* Corner paws */}
          <span className="absolute top-4 left-6 text-2xl opacity-30">🐾</span>
          <span className="absolute bottom-4 right-6 text-2xl opacity-30 rotate-180">🐾</span>
          
          <div className="max-w-2xl mx-auto">
            <h3 className="font-heading font-bold text-2xl md:text-3xl text-gray-900 mb-4">
              Bring Your Furry Friend! 🐕
            </h3>
            <p className="text-gray-600 mb-6">
              All Bjorn&apos;s Brew locations are dog-friendly! Enjoy your latte on our patio 
              while your pup enjoys a complimentary Pup Cup. We can&apos;t wait to meet them!
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-forest">
                <span className="w-8 h-8 bg-forest/10 rounded-full flex items-center justify-center">🐾</span>
                <span>Dogs welcome on patios</span>
              </div>
              <div className="flex items-center gap-2 text-forest">
                <span className="w-8 h-8 bg-forest/10 rounded-full flex items-center justify-center">🥤</span>
                <span>Free Pup Cups</span>
              </div>
              <div className="flex items-center gap-2 text-forest">
                <span className="w-8 h-8 bg-forest/10 rounded-full flex items-center justify-center">💧</span>
                <span>Water bowls available</span>
              </div>
            </div>
            
            <p className="mt-6 text-forest font-medium flex items-center justify-center gap-2">
              <Camera className="w-5 h-5" />
              Tag us @bjornsbrew to feature your pup!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
