import { HeroCarousel } from '@/components/home/hero-carousel'
import { VideoShowcase } from '@/components/home/video-showcase'
import { AboutPreview } from '@/components/home/about-preview'
import { FeaturedProjects } from '@/components/home/featured-projects'
import { NewsPreview } from '@/components/home/news-preview'
import { PartnersSection } from '@/components/home/partners-section'
import { CTASection } from '@/components/home/cta-section'

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <AboutPreview />
      <FeaturedProjects />
      <VideoShowcase />
      <NewsPreview />
      <PartnersSection />
      <CTASection />
    </>
  )
}
