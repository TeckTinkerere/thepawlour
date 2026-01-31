import HeroSection from '@/components/sections/HeroSection'
import TrustSignalsSection from '@/components/sections/TrustSignalsSection'
import ServicesPreviewSection from '@/components/sections/ServicesPreviewSection'
import BeforeAfterGallery from '@/components/sections/BeforeAfterGallery'
import TeamSection from '@/components/sections/TeamSection'
import MiniAboutSection from '@/components/sections/MiniAboutSection'
import LoyaltyProgram from '@/components/sections/LoyaltyProgram'
import FAQSection from '@/components/sections/FAQSection'
import ReviewsSection from '@/components/sections/ReviewsSection'
import CTASection from '@/components/sections/CTASection'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <TrustSignalsSection />
      <ServicesPreviewSection />
      <BeforeAfterGallery />
      <TeamSection />
      <MiniAboutSection />
      <LoyaltyProgram />
      <FAQSection />
      <ReviewsSection />
      <CTASection />
    </main>
  )
}