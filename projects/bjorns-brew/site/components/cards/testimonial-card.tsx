import { Star, Quote } from 'lucide-react'
import { type Testimonial } from '@/lib/data/testimonials'

interface TestimonialCardProps {
  testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <Quote className="w-8 h-8 text-forest/20 mb-4" />

      <blockquote className="text-gray-800 leading-relaxed mb-4">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <div className="flex gap-1 mb-3">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>

      <div>
        <p className="font-semibold text-gray-900">{testimonial.author}</p>
        {testimonial.location && (
          <p className="text-sm text-gray-500">{testimonial.location} Location</p>
        )}
      </div>
    </div>
  )
}
