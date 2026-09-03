import { ActionLink } from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { Section } from '@/components/ui/Section'
import { formatDays, formatHoursRow } from '@/lib/hours'
import type { SiteContent } from '@/lib/content'
import { WHATSAPP_MESSAGES } from '@/lib/whatsapp'

export default function CTASection({ content }: { content: SiteContent }) {
  const { business, hours } = content

  return (
    <Section tone="ink">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <p className="eyebrow text-paper/60">Book a slot</p>
          <h2 className="mt-4 max-w-xl text-3xl text-paper md:text-4xl">
            Tell us your pet&apos;s breed and a day that suits you
          </h2>
          <p className="mt-4 max-w-prose text-lg leading-relaxed text-paper/75">
            One message is enough to start. We will come back with a time, a price for your pet&apos;s coat, and
            anything we need you to bring.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppButton
              variant="whatsapp"
              size="lg"
              phoneNumber={business.whatsapp}
              message={WHATSAPP_MESSAGES.general}
            >
              Message us on WhatsApp
            </WhatsAppButton>
            <ActionLink
              href={`tel:${business.phone.replace(/\s/g, '')}`}
              variant="ghost"
              size="lg"
              className="border border-paper/30 text-paper hover:bg-paper hover:text-ink"
            >
              <Icon name="phone" className="h-4 w-4" />
              {business.phone}
            </ActionLink>
          </div>
        </div>

        <dl className="space-y-3 self-start border-t border-paper/20 pt-6 text-sm">
          <p className="eyebrow mb-4 text-paper/60">Opening hours</p>
          {hours.map((row) => (
            <div key={row.days.join('-')} className="flex justify-between gap-6 text-paper/80">
              <dt>{formatDays(row.days)}</dt>
              <dd className="tabular-nums">{formatHoursRow(row)}</dd>
            </div>
          ))}
          <div className="flex justify-between gap-6 border-t border-paper/20 pt-3 text-paper/60">
            <dt>Where</dt>
            <dd>{[business.addressLine, business.locality].filter(Boolean).join(', ')}</dd>
          </div>
        </dl>
      </div>
    </Section>
  )
}
