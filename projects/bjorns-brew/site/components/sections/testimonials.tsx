'use client'

import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { testimonials } from '@/lib/data/testimonials'
import { cn } from '@/lib/utils'

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="section-padding bg-cream">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Don&apos;t just take our word for it
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <Quote className="w-12 h-12 text-forest/20 mb-6" />

            <blockquote className="text-xl md:text-2xl text-gray-800 font-medium leading-relaxed mb-8">
              &ldquo;{testimonials[currentIndex].quote}&rdquo;
            </blockquote>

            <div className="flex items-center justify-between">
              <div>
                <div className="flex gap-1 mb-2">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="font-semibold text-gray-900">
                  {testimonials[currentIndex].author}
                </p>
                {testimonials[currentIndex].location && (
                  <p className="text-sm text-gray-500">
                    {testimonials[currentIndex].location} Location
                  </p>
                )}
              </div>

              {/* Navigation */}
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-forest hover:text-white hover:border-forest transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-forest hover:text-white hover:border-forest transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  'w-3 h-3 rounded-full transition-colors',
                  index === currentIndex ? 'bg-forest' : 'bg-gray-300'
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
