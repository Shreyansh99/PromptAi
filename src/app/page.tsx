import HeroSection from '@/components/landing/hero'
import FeatureDualCards from '@/components/landing/featuredualcards'
import Audience from '@/components/landing/audience'
import Features from '@/components/landing/features'
import HowItWorks from '@/components/landing/howitworks'
import Testimonials from '@/components/landing/testimonials'
import CTA from '@/components/landing/cta'

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureDualCards />
      <Audience />
      <HowItWorks />
      <Features />
      <Testimonials />
      <CTA />
    </>
  )
}
