import { LocationCard } from '@/components/cards/location-card'
import { locations } from '@/lib/data/locations'

interface LocationsGridProps {
  limit?: number
  showTitle?: boolean
}

export function LocationsGrid({ limit, showTitle = true }: LocationsGridProps) {
  const displayLocations = limit ? locations.slice(0, limit) : locations

  return (
    <section className="section-padding bg-beige-light">
      <div className="container-custom">
        {showTitle && (
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900">
              Visit Us
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Three locations across Salt Lake City, each with their own unique charm.
              Stop by and say hi!
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayLocations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>
      </div>
    </section>
  )
}
