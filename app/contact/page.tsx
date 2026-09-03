import type { Metadata } from 'next'
import BookingForm from '@/components/forms/BookingForm'
import Icon from '@/components/ui/Icon'
import { Section, SectionHeader } from '@/components/ui/Section'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { ActionLink } from '@/components/ui/Button'
import { getSiteContent } from '@/lib/content'
import { formatDays, formatHoursRow, getOpenStatus } from '@/lib/hours'
import { faqSchema, JsonLd } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Contact & booking',
  description:
    'Book a groom at The Pawlour in Hougang. WhatsApp, call, or send a booking request. Opening hours seven days a week.',
  alternates: { canonical: '/contact' },
}

export default async function ContactPage() {
  const content = await getSiteContent()
  const { business, hours } = content
  const status = getOpenStatus(hours, business.timezone)
  const telHref = `tel:${business.phone.replace(/\s/g, '')}`
  const serviceNames = content.services
    .filter((service) => service.type !== 'addon')
    .map((service) => service.name)

  return (
    <>
      <JsonLd data={faqSchema(content)} />

      <Section tone="paper" className="border-b border-line">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <p className="eyebrow">Contact</p>
            <h1 className="mt-4 text-4xl md:text-5xl">Book a groom</h1>
            <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-soft">
              WhatsApp is the fastest way to reach us — we usually reply within a couple of hours during opening
              hours. Prefer to talk it through? Call and we will pick up between grooms.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <WhatsAppButton variant="whatsapp" size="lg" phoneNumber={business.whatsapp}>
                WhatsApp {business.phone}
              </WhatsAppButton>
              <ActionLink href={telHref} variant="secondary" size="lg">
                <Icon name="phone" className="h-4 w-4" />
                Call us
              </ActionLink>
            </div>
          </div>

          {/* Hours, with a live open/closed state rather than a hard-coded badge. */}
          <div className="border border-line bg-paper-card p-7">
            <div className="flex items-center gap-2.5 border-b border-line pb-4">
              <span
                className={`h-2 w-2 rounded-full ${status.isOpen ? 'bg-whatsapp' : 'bg-line-strong'}`}
                aria-hidden="true"
              />
              <p className="font-display text-ink">{status.label}</p>
            </div>

            <dl className="mt-4 space-y-2.5 text-sm">
              {hours.map((row) => (
                <div key={row.days.join('-')} className="flex justify-between gap-6">
                  <dt className="text-ink-soft">{formatDays(row.days)}</dt>
                  <dd className="tabular-nums text-ink">{formatHoursRow(row)}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-5 flex items-start gap-3 border-t border-line pt-4 text-sm text-ink-soft">
              <Icon name="pin" className="mt-0.5 h-4 w-4 flex-none text-ink-muted" />
              <span>
                {[business.addressLine, business.locality, business.region, business.postalCode]
                  .filter(Boolean)
                  .join(', ')}
              </span>
            </p>
          </div>
        </div>
      </Section>

      {/* Booking request */}
      <Section tone="shell">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeader
              eyebrow="Booking request"
              title="Send us the details"
              intro="Fill this in and it becomes a WhatsApp message with everything we need — you can edit it before sending."
            />
            <ul className="space-y-3 border-t border-line pt-6 text-sm text-ink-soft">
              {[
                'We reply with a time and a price for your pet’s coat',
                'Nothing is confirmed until you hear back from us',
                'Tell us about skin conditions or handling worries here',
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <Icon name="check" className="mt-1 h-3.5 w-3.5 flex-none text-clay" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-line bg-paper-card p-7 md:p-9">
            <BookingForm phoneNumber={business.whatsapp} services={serviceNames} />
          </div>
        </div>
      </Section>

      {/* Map */}
      {business.mapEmbedUrl && (
        <Section tone="paper">
          <SectionHeader eyebrow="Find us" title={`${business.locality}, ${business.region}`} />
          <div className="border border-line">
            <iframe
              src={business.mapEmbedUrl}
              height={420}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${business.name} on Google Maps`}
              className="block w-full border-0"
            />
          </div>
          {business.googleMapsUrl && (
            <p className="mt-4 text-sm">
              <a
                href={business.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
              >
                Open in Google Maps
              </a>
            </p>
          )}
        </Section>
      )}
    </>
  )
}
