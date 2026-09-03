import Icon from './Icon'
import type { Testimonial } from '@/lib/content/types'

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { name, quote, rating, petName, petBreed } = testimonial
  const pet = [petName, petBreed].filter(Boolean).join(' · ')

  return (
    <figure className="flex h-full flex-col bg-paper-card p-7">
      <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Icon key={index} name="star" className={`h-3.5 w-3.5 ${index < rating ? 'text-clay' : 'text-line-strong'}`} />
        ))}
      </div>

      <blockquote className="mt-4 flex-1 leading-relaxed text-ink-soft">{quote}</blockquote>

      <figcaption className="mt-6 border-t border-line pt-4 text-sm">
        <span className="font-display text-ink">{name}</span>
        {pet && <span className="block text-ink-muted">{pet}</span>}
      </figcaption>
    </figure>
  )
}
