import type { Metadata } from 'next'
import { MenuCard } from '@/components/cards/menu-card'
import { menuCategories } from '@/lib/data/menu'
import { Leaf, Wheat } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Menu',
  description: "Explore Bjorn's Brew menu featuring specialty coffee, espresso drinks, tea, and fresh pastries. Something for everyone!",
}

export default function MenuPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-beige-light">
        <div className="container-custom text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-gray-900">
            Our Menu
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            From our signature blends to seasonal specials, there&apos;s something for
            everyone. All made with love and the finest ingredients.
          </p>

          {/* Milk Alternatives Banner */}
          <div className="mt-8 bg-forest/10 border-2 border-forest rounded-xl px-6 py-4 max-w-xl mx-auto">
            <p className="text-forest font-semibold text-lg">
              🥛 Milk Alternatives Available!
            </p>
            <p className="text-forest/80 mt-1">
              All drinks available with <strong>oat, almond, or soy milk</strong> (+$0.75)
            </p>
          </div>

          {/* Dietary Legend */}
          <div className="flex justify-center gap-6 mt-6 text-sm">
            <span className="flex items-center gap-2 text-green-600">
              <Leaf className="w-4 h-4" />
              Vegan
            </span>
            <span className="flex items-center gap-2 text-amber-600">
              <Wheat className="w-4 h-4" />
              Gluten-Free
            </span>
            <span className="flex items-center gap-2 text-blue-600">
              <Leaf className="w-4 h-4" />
              Dairy-Free
            </span>
          </div>
        </div>
      </section>

      {/* Pup Cup Featured Section */}
      <section className="py-8 bg-pink-light">
        <div className="container-custom">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 max-w-3xl mx-auto border-2 border-pink">
            <div className="text-6xl md:text-7xl">🐕</div>
            <div className="text-center md:text-left flex-1">
              <div className="inline-block bg-forest text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                FREE!
              </div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-gray-900">
                Pup Cup
              </h2>
              <p className="text-gray-600 mt-2">
                Bring your furry friend! Every pup gets a free cup of whipped cream. 
                Because at Bjorn&apos;s Brew, dogs are family too! 🐾
              </p>
            </div>
            <div className="text-4xl animate-bounce-slow">☕🐾</div>
          </div>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          {/* Category Navigation */}
          <nav className="flex flex-wrap justify-center gap-4 mb-12">
            {menuCategories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="px-6 py-2 bg-white rounded-full shadow-sm hover:bg-forest hover:text-white transition-colors font-medium"
              >
                {category.icon} {category.name}
              </a>
            ))}
          </nav>

          {/* Menu Sections */}
          <div className="space-y-16">
            {menuCategories.map((category) => (
              <div key={category.id} id={category.id}>
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-3xl">{category.icon}</span>
                  <h2 className="font-heading font-bold text-2xl md:text-3xl text-gray-900">
                    {category.name}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((item) => (
                    <MenuCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us CTA */}
      <section className="py-16 bg-forest text-center">
        <div className="container-custom">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-4">
            Come See Us!
          </h2>
          <p className="text-beige mb-8 max-w-xl mx-auto">
            Visit any of our 3 Salt Lake City locations for the full Bjorn&apos;s Brew experience.
          </p>
          <a
            href="/locations"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-forest font-semibold rounded-lg hover:bg-beige transition-colors"
          >
            Find a Location
          </a>
        </div>
      </section>
    </>
  )
}
