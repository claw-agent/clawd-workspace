import { Hero } from '@/components/sections/hero'
import { AboutPreview } from '@/components/sections/about-preview'
import { LocationsGrid } from '@/components/sections/locations-grid'
import { MissionBanner } from '@/components/sections/mission-banner'
import { Testimonials } from '@/components/sections/testimonials'
import { SeasonalBanner } from '@/components/sections/seasonal-banner'
import { ImpactGallery } from '@/components/sections/impact-gallery'
import { CommunityDogs } from '@/components/sections/community-dogs'
import { PawDivider } from '@/components/ui/paw-divider'

export default function HomePage() {
  return (
    <>
      <Hero
        headline="Love Coffee. Love Animals."
        subheadline="Meet Bjorn! Every cup supports local animal charities. Quality coffee, happy pups, community love."
        backgroundImage="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&q=80"
        mascotImage="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80"
        ctaPrimary={{ text: 'Find a Location', href: '/locations' }}
        ctaSecondary={{ text: 'View Menu', href: '/menu' }}
        layout="mascot-feature"
        height="full"
      />

      <SeasonalBanner />

      <AboutPreview />

      <PawDivider variant="scattered" color="forest" />

      <LocationsGrid />

      <ImpactGallery />

      <MissionBanner />

      <CommunityDogs />

      <Testimonials />
    </>
  )
}
