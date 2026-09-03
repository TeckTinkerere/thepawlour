import type { SiteContent } from '@/lib/content'

/**
 * Structured data generated from the content file.
 *
 * Hand-written JSON-LD had drifted from the site: a placeholder
 * "+65-XXXX-XXXX" telephone, a `servesCuisine` property left over from a
 * restaurant template, and an aggregateRating of a flat 5 stars over 500
 * reviews that matched neither the page nor the Google listing. Generating it
 * keeps the markup and the visible page from disagreeing.
 */
export function localBusinessSchema(content: SiteContent) {
  const { business, hours, reviews, services } = content

  const address = {
    '@type': 'PostalAddress',
    ...(business.addressLine ? { streetAddress: business.addressLine } : {}),
    addressLocality: business.locality,
    addressRegion: business.region,
    ...(business.postalCode ? { postalCode: business.postalCode } : {}),
    addressCountry: business.country,
  }

  const rating = Number(reviews.rating)
  const count = Number(reviews.count)

  return {
    '@context': 'https://schema.org',
    '@type': 'PetGroomer',
    name: business.name,
    description: business.description,
    url: business.url,
    telephone: business.phone,
    priceRange: business.priceRange,
    address,
    areaServed: business.region,
    openingHoursSpecification: hours
      .filter((row) => !row.closed)
      .map((row) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: row.days,
        opens: row.opens,
        closes: row.closes,
      })),
    // Only emitted when the numbers are real; an invented rating is a
    // structured-data violation, not a growth tactic.
    ...(Number.isFinite(rating) && Number.isFinite(count) && count > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: reviews.rating,
            reviewCount: reviews.count,
          },
        }
      : {}),
    ...(business.instagram || business.facebook || business.googleMapsUrl
      ? { sameAs: [business.instagram, business.facebook, business.googleMapsUrl].filter(Boolean) }
      : {}),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Pet grooming services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: service.name, description: service.summary },
      })),
    },
  }
}

export function faqSchema(content: SiteContent) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

/** Renders a JSON-LD block. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
