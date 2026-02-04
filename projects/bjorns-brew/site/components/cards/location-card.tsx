import Image from 'next/image'
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { type Location } from '@/lib/data/locations'

interface LocationCardProps {
  location: Location
}

export function LocationCard({ location }: LocationCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Image */}
      <div className="relative aspect-video">
        <Image
          src={location.image}
          alt={`Bjorn's Brew ${location.name} location`}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="font-heading font-bold text-xl text-gray-900">
          {location.name}
        </h3>

        <div className="space-y-3 text-gray-600">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" />
            <span>
              {location.address}
              <br />
              {location.city}, {location.state} {location.zip}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-forest flex-shrink-0" />
            <a
              href={`tel:${location.phone}`}
              className="hover:text-forest transition-colors"
            >
              {location.phone}
            </a>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" />
            <div>
              <p>{location.hours.weekday}</p>
              <p>{location.hours.weekend}</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {location.features.map((feature) => (
            <span
              key={feature}
              className="px-3 py-1 bg-beige-light text-sm text-gray-700 rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Button
          href={location.mapUrl}
          variant="outline"
          className="w-full gap-2"
        >
          <ExternalLink className="w-4 h-4" />
          Get Directions
        </Button>
      </div>
    </div>
  )
}
