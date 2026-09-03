import { Section, SectionHeader } from '@/components/ui/Section'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import type { SiteContent } from '@/lib/content'

/**
 * The loyalty programme. Set `loyalty.enabled` to false in content to hide it.
 * Claims the salon cannot yet back (a points-tracking app, a reward catalogue
 * count) were removed rather than restyled.
 */
export default function LoyaltyProgram({ content }: { content: SiteContent }) {
  const { loyalty, business } = content
  if (!loyalty.enabled) return null

  return (
    <Section tone="shell">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeader eyebrow="Loyalty" title={loyalty.title} intro={loyalty.intro} />

          {loyalty.steps.length > 0 && (
            <ol className="space-y-4 border-t border-line pt-6">
              {loyalty.steps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="font-display text-sm text-ink-muted tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="font-display text-ink">{step.title}</span>
                    <span className="text-ink-soft"> — {step.description}</span>
                  </span>
                </li>
              ))}
            </ol>
          )}

          <div className="mt-8">
            <WhatsAppButton
              variant="secondary"
              phoneNumber={business.whatsapp}
              message={`Hello! I'd like to join ${loyalty.title}.`}
            >
              Ask about joining
            </WhatsAppButton>
          </div>
        </div>

        <ul className="grid self-start gap-x-10 sm:grid-cols-2">
          {loyalty.benefits.map((benefit) => (
            <li key={benefit.title} className="border-t border-line py-5">
              <h3 className="text-lg">{benefit.title}</h3>
              <p className="mt-2 text-[0.925rem] leading-relaxed text-ink-soft">{benefit.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
