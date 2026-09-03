import Icon from '@/components/ui/Icon'
import { Section, SectionHeader } from '@/components/ui/Section'
import { TextLink } from '@/components/ui/Button'
import type { SiteContent } from '@/lib/content'

/**
 * A price list, not a photo grid.
 *
 * The previous version paired each service with an unrelated stock photo of
 * someone else's dog. Prices are what people come to this section for, so the
 * type does the work and the "from" price is visible without a click.
 */
export default function ServicesPreviewSection({ content }: { content: SiteContent }) {
  const packages = content.services.filter((service) => service.type === 'package')
  const spa = content.services.filter((service) => service.type === 'spa')

  return (
    <Section id="services" tone="paper">
      <SectionHeader
        eyebrow="Services"
        title="Grooming, spa and everything between"
        intro="Every groom starts with a health check and a chat about your pet's coat. Prices below are starting points — the final quote depends on breed, size and coat condition."
      />

      <div className="grid gap-px border border-line bg-line lg:grid-cols-2">
        {packages.map((service) => (
          <article key={service.name} className="flex flex-col bg-paper-card p-7 md:p-9">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-2xl">{service.name}</h3>
              {service.featured && <span className="eyebrow text-clay">Most booked</span>}
            </div>

            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{service.summary}</p>

            <ul className="mt-6 space-y-2 border-t border-line pt-6">
              {service.includes.slice(0, 5).map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.925rem] text-ink-soft">
                  <Icon name="check" className="mt-1 h-3.5 w-3.5 flex-none text-clay" />
                  {item}
                </li>
              ))}
              {service.includes.length > 5 && (
                <li className="pl-[26px] text-[0.925rem] text-ink-muted">
                  + {service.includes.length - 5} more
                </li>
              )}
            </ul>

            {service.pricing && (
              <dl className="mt-auto grid grid-cols-3 gap-4 border-t border-line pt-6 text-sm">
                {[
                  ['Small', service.pricing.small],
                  ['Medium', service.pricing.medium],
                  ['Large', service.pricing.large],
                ]
                  .filter(([, price]) => Boolean(price))
                  .map(([label, price]) => (
                    <div key={label}>
                      <dt className="eyebrow">{label}</dt>
                      <dd className="mt-1 font-display text-lg text-ink">{price}</dd>
                    </div>
                  ))}
              </dl>
            )}
          </article>
        ))}
      </div>

      {spa.length > 0 && (
        <div className="mt-10">
          <p className="eyebrow mb-4">Spa treatments</p>
          <ul className="divide-y divide-line border-y border-line">
            {spa.map((treatment) => (
              <li key={treatment.name} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
                <span className="font-display text-lg text-ink">{treatment.name}</span>
                <span className="order-3 w-full text-sm text-ink-muted md:order-2 md:w-auto md:flex-1 md:px-8">
                  {treatment.summary}
                </span>
                <span className="order-2 font-display text-lg text-clay md:order-3">{treatment.price}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-10">
        <TextLink href="/services">See the full list, add-ons and pricing</TextLink>
      </div>
    </Section>
  )
}
