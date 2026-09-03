import Icon from '@/components/ui/Icon'
import { Section, SectionHeader } from '@/components/ui/Section'
import TestimonialCard from '@/components/ui/TestimonialCard'
import type { SiteContent } from '@/lib/content'

/**
 * Reviews and the map.
 *
 * The rating and count come from content so they can be kept in step with the
 * real Google listing — they also feed the LocalBusiness structured data, and
 * inventing them there is a manual-action risk.
 */
export default function ReviewsSection({ content }: { content: SiteContent }) {
  const { reviews, testimonials, business } = content

  return (
    <Section tone="shell">
      <SectionHeader
        eyebrow="Reviews"
        title="What pet parents say"
        intro={`Rated ${reviews.rating} out of 5 across ${reviews.count}+ Google reviews.`}
      />

      <div className="mb-10 flex items-center gap-3">
        <span className="flex gap-0.5" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, index) => (
            <Icon
              key={index}
              name="star"
              className={`h-4 w-4 ${index < Math.round(Number(reviews.rating) || 0) ? 'text-clay' : 'text-line-strong'}`}
            />
          ))}
        </span>
        <span className="text-sm text-ink-muted">
          {reviews.rating} average · {reviews.count}+ reviews
        </span>
      </div>

      {testimonials.length > 0 && (
        <div className="mb-12 grid gap-px border border-line bg-line md:grid-cols-3">
          {testimonials.slice(0, 3).map((testimonial) => (
            <TestimonialCard key={`${testimonial.name}-${testimonial.quote.slice(0, 12)}`} testimonial={testimonial} />
          ))}
        </div>
      )}

      {business.mapEmbedUrl && (
        <div className="border border-line bg-paper-card">
          <iframe
            src={business.mapEmbedUrl}
            height={420}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${business.name} on Google Maps`}
            className="block w-full border-0"
          />
        </div>
      )}
    </Section>
  )
}
