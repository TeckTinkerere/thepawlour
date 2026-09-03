import Icon from '@/components/ui/Icon'
import Figure from '@/components/ui/Figure'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { ActionLink } from '@/components/ui/Button'
import { getOpenStatus } from '@/lib/hours'
import type { SiteContent } from '@/lib/content'
import { WHATSAPP_MESSAGES } from '@/lib/whatsapp'

/**
 * Editorial split rather than a full-bleed photo with centred white text.
 *
 * The old hero was `min-h-screen`, so the first thing a visitor could act on
 * sat below the fold on a laptop. Here the headline, the proof points, today's
 * hours and the booking action are all visible immediately.
 */
export default function HeroSection({ content }: { content: SiteContent }) {
  const { hero, business, hours } = content
  const status = getOpenStatus(hours, business.timezone)

  return (
    <section className="border-b border-line bg-paper">
      <div className="container grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="max-w-xl">
          <p className="eyebrow">{business.tagline}</p>

          <h1 className="mt-5 text-4xl leading-[1.08] md:text-5xl lg:text-6xl">{hero.headline}</h1>

          <p className="mt-5 text-lg leading-relaxed text-ink-soft">{hero.intro}</p>

          <ul className="mt-7 flex flex-col gap-2.5 border-t border-line pt-6">
            {hero.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-[0.95rem] text-ink-soft">
                <Icon name="check" className="mt-1 h-4 w-4 flex-none text-clay" />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <WhatsAppButton
              variant="primary"
              size="lg"
              phoneNumber={business.whatsapp}
              message={WHATSAPP_MESSAGES.general}
            >
              Book on WhatsApp
            </WhatsAppButton>
            <ActionLink href="/services" variant="secondary" size="lg">
              Services &amp; prices
            </ActionLink>
          </div>

          {/* Live open/closed, worked out from the opening hours in the content file. */}
          <p className="mt-6 flex items-center gap-2 text-sm text-ink-muted">
            <span
              className={`h-1.5 w-1.5 rounded-full ${status.isOpen ? 'bg-whatsapp' : 'bg-line-strong'}`}
              aria-hidden="true"
            />
            {status.label}
            <span aria-hidden="true">·</span>
            <span>{business.locality}</span>
          </p>
        </div>

        <Figure src={hero.image} alt={hero.imageAlt} priority />
      </div>
    </section>
  )
}
