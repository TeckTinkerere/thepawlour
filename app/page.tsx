import HeroSection from '@/components/sections/HeroSection'
import TrustSignalsSection from '@/components/sections/TrustSignalsSection'
import ServicesPreviewSection from '@/components/sections/ServicesPreviewSection'
import TeamSection from '@/components/sections/TeamSection'
import MiniAboutSection from '@/components/sections/MiniAboutSection'
import LoyaltyProgram from '@/components/sections/LoyaltyProgram'
import FAQSection from '@/components/sections/FAQSection'
import ReviewsSection from '@/components/sections/ReviewsSection'
import CTASection from '@/components/sections/CTASection'
import { getSiteContent } from '@/lib/content'
import { faqSchema, JsonLd } from '@/lib/schema'

export default async function Home() {
  const content = await getSiteContent()

  return (
    <>
      <JsonLd data={faqSchema(content)} />
      <HeroSection content={content} />
      <TrustSignalsSection content={content} />
      <ServicesPreviewSection content={content} />
      <MiniAboutSection content={content} />
      <TeamSection content={content} />
      <ReviewsSection content={content} />
      <LoyaltyProgram content={content} />
      <FAQSection content={content} />
      <CTASection content={content} />
    </>
  )
}
