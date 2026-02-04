import { Leaf, Wheat } from 'lucide-react'
import { type MenuItem } from '@/lib/data/menu'
import { cn } from '@/lib/utils'

interface MenuCardProps {
  item: MenuItem
}

const dietaryIcons = {
  vegan: { icon: Leaf, label: 'Vegan', color: 'text-green-600' },
  gf: { icon: Wheat, label: 'Gluten-Free', color: 'text-amber-600' },
  df: { icon: Leaf, label: 'Dairy-Free', color: 'text-blue-600' },
}

export function MenuCard({ item }: MenuCardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100',
        item.featured && 'ring-2 ring-forest ring-offset-2'
      )}
    >
      {/* Featured Badge */}
      {item.featured && (
        <span className="inline-block px-3 py-1 bg-forest text-white text-xs font-medium rounded-full mb-3">
          Staff Pick
        </span>
      )}

      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="font-heading font-semibold text-lg text-gray-900">
            {item.name}
          </h3>
          <p className="mt-1 text-gray-600 text-sm leading-relaxed line-clamp-2">
            {item.description}
          </p>

          {/* Dietary Icons */}
          {item.dietary && item.dietary.length > 0 && (
            <div className="flex gap-2 mt-3">
              {item.dietary.map((diet) => {
                const info = dietaryIcons[diet]
                return (
                  <span
                    key={diet}
                    className={cn('flex items-center gap-1 text-xs', info.color)}
                    title={info.label}
                  >
                    <info.icon className="w-3.5 h-3.5" />
                    {info.label}
                  </span>
                )
              })}
            </div>
          )}
        </div>

        <span className="font-heading font-bold text-lg text-forest whitespace-nowrap">
          {item.price === 0 ? 'Free!' : `$${item.price.toFixed(2)}`}
        </span>
      </div>
    </div>
  )
}
