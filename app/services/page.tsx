import type { Metadata } from 'next'
import Icon from '@/components/ui/Icon'
import { Section, SectionHeader } from '@/components/ui/Section'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { ActionLink } from '@/components/ui/Button'
import { getSiteContent } from '@/lib/content'
import { WHATSAPP_MESSAGES } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Services & pricing',
  description:
    'Grooming packages, spa treatments and add-ons at The Pawlour, Hougang. Prices by pet size, cage-free salon, SKC-certified groomers.',
  alternates: { canonical: '/services' },
}

export default async function ServicesPage() {
  const content = await getSiteContent()
  const packages = content.services.filter((service) => service.type === 'package')
  const spa = content.services.filter((service) => service.type === 'spa')
  const addons = content.services.filter((service) => service.type === 'addon')

  return (
    <>
      <Section tone="paper" className="border-b border-line">
        <p className="eyebrow">Services</p>
        <h1 className="mt-4 max-w-2xl text-4xl md:text-5xl">Services &amp; pricing</h1>
        <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-soft">
          Everything below happens in one open room, at your pet&apos;s pace. Prices start from the figures shown
          and settle once we have seen the coat — message us with a breed and we will quote before you commit.
        </p>
      </Section>

      {/* Packages */}
      <Section tone="paper">
        <SectionHeader eyebrow="Packages" title="Grooming packages" />

        <div className="grid gap-px border border-line bg-line lg:grid-cols-2">
          {packages.map((service) => (
            <article key={service.name} className="flex flex-col bg-paper-card p-7 md:p-9">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-2xl">{service.name}</h3>
                {service.featured && <span className="eyebrow text-clay">Most booked</span>}
              </div>
              <p className="mt-3 leading-relaxed text-ink-soft">{service.summary}</p>

              <h4 className="eyebrow mt-8 mb-4 border-t border-line pt-6">What&apos;s included</h4>
              <ul className="space-y-2">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.95rem] text-ink-soft">
                    <Icon name="check" className="mt-1 h-3.5 w-3.5 flex-none text-clay" />
                    {item}
                  </li>
                ))}
              </ul>

              {service.pricing && (
                <div className="mt-auto pt-8">
                  <h4 className="eyebrow mb-4">Price by size</h4>
                  <dl className="grid grid-cols-3 gap-4 border-t border-line pt-4">
                    {[
                      ['Small', service.pricing.small, 'Up to 15kg'],
                      ['Medium', service.pricing.medium, '15–30kg'],
                      ['Large', service.pricing.large, 'Over 30kg'],
                    ]
                      .filter(([, price]) => Boolean(price))
                      .map(([label, price, weight]) => (
                        <div key={label}>
                          <dt className="eyebrow">{label}</dt>
                          <dd className="mt-1 font-display text-lg text-ink">{price}</dd>
                          <dd className="text-xs text-ink-muted">{weight}</dd>
                        </div>
                      ))}
                  </dl>
                </div>
              )}
            </article>
          ))}
        </div>
      </Section>

      {/* Spa */}
      {spa.length > 0 && (
        <Section tone="shell">
          <SectionHeader
            eyebrow="Spa"
            title="Spa treatments"
            intro="Added to any grooming package, usually for skin comfort rather than looks."
          />

          <div className="grid gap-px border border-line bg-line md:grid-cols-2">
            {spa.map((treatment) => (
              <article key={treatment.name} className="bg-paper-card p-7 md:p-9">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-xl">{treatment.name}</h3>
                  <span className="font-display text-lg text-clay">{treatment.price}</span>
                </div>
                <p className="mt-3 leading-relaxed text-ink-soft">{treatment.summary}</p>
                {treatment.includes.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-2 border-t border-line pt-5">
                    {treatment.includes.map((benefit) => (
                      <li key={benefit} className="border border-line px-2.5 py-1 text-xs text-ink-muted">
                        {benefit}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </Section>
      )}

      {/* Add-ons */}
      {addons.length > 0 && (
        <Section tone="paper">
          <SectionHeader eyebrow="Add-ons" title="Add to any groom" />

          <ul className="divide-y divide-line border-y border-line">
            {addons.map((addon) => (
              <li key={addon.name} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
                <span className="font-display text-lg text-ink">{addon.name}</span>
                <span className="order-3 w-full text-sm text-ink-muted md:order-2 md:w-auto md:flex-1 md:px-8">
                  {addon.summary}
                </span>
                <span className="order-2 font-display text-lg text-clay md:order-3">{addon.price}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-prose border-l-2 border-clay pl-5 text-[0.95rem] leading-relaxed text-ink-soft">
            Prices vary with breed, coat condition, size and temperament. A matted or badly tangled coat takes
            longer and is quoted separately — we will always tell you before we start, not after.
          </p>
        </Section>
      )}

      <Section tone="ink">
        <div className="max-w-2xl">
          <h2 className="text-3xl text-paper md:text-4xl">Not sure which one your pet needs?</h2>
          <p className="mt-4 text-lg leading-relaxed text-paper/75">
            Send us the breed and a photo of the coat as it is now. We will tell you what it needs and what it
            costs — no obligation to book.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppButton
              variant="whatsapp"
              size="lg"
              phoneNumber={content.business.whatsapp}
              message={WHATSAPP_MESSAGES.pricing}
            >
              Get a quote
            </WhatsAppButton>
            <ActionLink
              href="/contact"
              variant="ghost"
              size="lg"
              className="border border-paper/30 text-paper hover:bg-paper hover:text-ink"
            >
              Contact &amp; hours
            </ActionLink>
          </div>
        </div>
      </Section>
    </>
  )
}
