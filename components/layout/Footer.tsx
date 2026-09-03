import Link from 'next/link'
import Image from 'next/image'
import Icon from '@/components/ui/Icon'
import { formatDays, formatHoursRow } from '@/lib/hours'
import type { SiteContent } from '@/lib/content'

/**
 * A real footer.
 *
 * The site previously shipped a placeholder that was never rendered, so hours,
 * address and contact details existed only on the contact page — the single
 * most-looked-for information on a local business site.
 */
export default function Footer({ content }: { content: SiteContent }) {
  const { business, hours } = content
  const year = new Date().getFullYear()

  const social = [
    business.instagram && { label: 'Instagram', href: business.instagram },
    business.facebook && { label: 'Facebook', href: business.facebook },
  ].filter(Boolean) as { label: string; href: string }[]

  return (
    <footer className="border-t border-line bg-paper-shell" role="contentinfo">
      <div className="container grid gap-10 py-14 md:grid-cols-3 md:gap-12 md:py-16">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <Image src="/icons/transparent_logo.png" alt="" width={44} height={44} className="h-11 w-11" />
            <span className="font-display text-lg uppercase tracking-wordmark text-ink">
              <span className="font-light">The</span>
              <span className="ml-1.5 font-medium">Pawlour</span>
            </span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-soft">{business.description}</p>
          {social.length > 0 && (
            <ul className="mt-5 flex gap-4 text-sm">
              {social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="eyebrow mb-4">Opening hours</h2>
          <dl className="space-y-2 text-sm">
            {hours.map((row) => (
              <div key={row.days.join('-')} className="flex justify-between gap-6">
                <dt className="text-ink-soft">{formatDays(row.days)}</dt>
                <dd className="tabular-nums text-ink">{formatHoursRow(row)}</dd>
              </div>
            ))}
          </dl>

          <h2 className="eyebrow mb-3 mt-8">Pages</h2>
          <ul className="space-y-2 text-sm">
            {[
              { href: '/services', label: 'Services & pricing' },
              { href: '/about', label: 'About' },
              { href: '/contact', label: 'Contact & booking' },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-ink-soft hover:text-clay">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow mb-4">Find us</h2>
          <address className="space-y-3 text-sm not-italic">
            <p className="flex items-start gap-3 text-ink-soft">
              <Icon name="pin" className="mt-0.5 h-4 w-4 flex-none text-ink-muted" />
              <span>
                {[business.addressLine, business.locality, business.region, business.postalCode]
                  .filter(Boolean)
                  .join(', ')}
              </span>
            </p>
            <p className="flex items-center gap-3">
              <Icon name="phone" className="h-4 w-4 flex-none text-ink-muted" />
              <a href={`tel:${business.phone.replace(/\s/g, '')}`} className="text-ink hover:text-clay">
                {business.phone}
              </a>
            </p>
            <p className="flex items-center gap-3">
              <Icon name="whatsapp" className="h-4 w-4 flex-none text-ink-muted" />
              <a
                href={`https://wa.me/${business.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:text-clay"
              >
                WhatsApp us
              </a>
            </p>
            {business.email && (
              <p className="pl-7">
                <a href={`mailto:${business.email}`} className="text-ink hover:text-clay">
                  {business.email}
                </a>
              </p>
            )}
          </address>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container flex flex-col gap-1 py-6 text-xs text-ink-muted md:flex-row md:justify-between">
          <p>
            © {year} {business.name}. {business.tagline}.
          </p>
          <p>{business.locality}, {business.region}</p>
        </div>
      </div>
    </footer>
  )
}
