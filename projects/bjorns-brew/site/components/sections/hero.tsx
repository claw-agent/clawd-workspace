import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface HeroProps {
  headline: string
  subheadline?: string
  backgroundImage: string
  mascotImage?: string
  ctaPrimary?: { text: string; href: string }
  ctaSecondary?: { text: string; href: string }
  overlay?: 'dark' | 'light' | 'none'
  height?: 'full' | 'large' | 'medium'
  align?: 'left' | 'center'
  layout?: 'classic' | 'mascot-feature'
}

export function Hero({
  headline,
  subheadline,
  backgroundImage,
  mascotImage,
  ctaPrimary,
  ctaSecondary,
  overlay = 'dark',
  height = 'large',
  align = 'left',
  layout = 'classic',
}: HeroProps) {
  const heightClasses = {
    full: 'min-h-screen',
    large: 'min-h-[80vh]',
    medium: 'min-h-[60vh]',
  }

  const overlayClasses = {
    dark: 'bg-gradient-to-r from-black/70 via-black/50 to-black/30',
    light: 'bg-white/30',
    none: '',
  }

  // Mascot-feature layout with Bjorn as the star
  if (layout === 'mascot-feature' && mascotImage) {
    return (
      <section className={cn('relative flex items-center overflow-hidden', heightClasses[height])}>
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className={cn('absolute inset-0', overlayClasses[overlay])} />

        {/* Content */}
        <div className="container-custom relative z-10 py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="order-2 lg:order-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-pink/90 text-forest px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
                <span>🐾</span>
                <span>$183,000+ donated to animal charities</span>
              </div>

              <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight animate-fade-in">
                {headline}
              </h1>

              {subheadline && (
                <p className="mt-6 text-lg sm:text-xl text-white/90 max-w-lg animate-slide-up">
                  {subheadline}
                </p>
              )}

              {(ctaPrimary || ctaSecondary) && (
                <div className="mt-8 flex flex-wrap gap-4 animate-slide-up">
                  {ctaPrimary && (
                    <Button href={ctaPrimary.href} size="lg">
                      {ctaPrimary.text}
                    </Button>
                  )}
                  {ctaSecondary && (
                    <Button 
                      href={ctaSecondary.href} 
                      variant="outline" 
                      size="lg" 
                      className="bg-white/10 border-white text-white hover:bg-white hover:text-forest"
                    >
                      {ctaSecondary.text}
                    </Button>
                  )}
                </div>
              )}

              {/* Trust badges */}
              <div className="mt-10 flex items-center gap-6 text-white/70 text-sm animate-fade-in">
                <div className="flex items-center gap-2">
                  <span className="text-lg">☕</span>
                  <span>Family-owned since 2008</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">📍</span>
                  <span>3 SLC locations</span>
                </div>
              </div>
            </div>

            {/* Mascot Image - Bjorn takes center stage */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative">
                {/* Decorative circle behind Bjorn */}
                <div className="absolute -inset-4 bg-gradient-to-br from-pink/30 to-beige/20 rounded-full blur-2xl" />
                
                {/* Bjorn's image with playful styling */}
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl animate-float">
                  <Image
                    src={mascotImage}
                    alt="Bjorn - Our Australian Shepherd mascot"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Speech bubble */}
                <div className="absolute -bottom-2 -right-2 sm:bottom-4 sm:right-0 bg-white rounded-2xl px-4 py-2 shadow-lg animate-bounce-slow">
                  <p className="font-heading font-semibold text-forest text-sm sm:text-base">Woof! ☕</p>
                  <div className="absolute -bottom-2 left-4 w-4 h-4 bg-white rotate-45" />
                </div>

                {/* Floating coffee cup */}
                <div className="absolute top-4 -left-4 text-4xl animate-bounce-slow" style={{ animationDelay: '0.5s' }}>
                  ☕
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-white/50" />
          </div>
        </div>
      </section>
    )
  }

  // Classic layout
  return (
    <section
      className={cn(
        'relative flex items-center',
        heightClasses[height]
      )}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Overlay */}
      {overlay !== 'none' && (
        <div className={cn('absolute inset-0', overlayClasses[overlay])} />
      )}

      {/* Content */}
      <div className="container-custom relative z-10 py-20">
        <div
          className={cn(
            'max-w-2xl',
            align === 'center' && 'mx-auto text-center'
          )}
        >
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-white text-shadow leading-tight animate-fade-in">
            {headline}
          </h1>

          {subheadline && (
            <p className="mt-6 text-lg sm:text-xl text-white/90 text-shadow animate-slide-up">
              {subheadline}
            </p>
          )}

          {(ctaPrimary || ctaSecondary) && (
            <div
              className={cn(
                'mt-8 flex flex-wrap gap-4',
                align === 'center' && 'justify-center'
              )}
            >
              {ctaPrimary && (
                <Button href={ctaPrimary.href} size="lg">
                  {ctaPrimary.text}
                </Button>
              )}
              {ctaSecondary && (
                <Button href={ctaSecondary.href} variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white hover:text-forest">
                  {ctaSecondary.text}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-white/50" />
        </div>
      </div>
    </section>
  )
}
