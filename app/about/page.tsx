import type { Metadata } from 'next'
import Icon, { type IconName } from '@/components/ui/Icon'
import Figure from '@/components/ui/Figure'
import { Section, SectionHeader } from '@/components/ui/Section'
import TestimonialCard from '@/components/ui/TestimonialCard'
import TeamSection from '@/components/sections/TeamSection'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { getSiteContent } from '@/lib/content'
import { WHATSAPP_MESSAGES } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'About',
  description:
    'How The Pawlour works: a cage-free Hougang salon with SKC-certified groomers, short booking lists and products matched to each coat.',
  alternates: { canonical: '/about' },
}

const CHAPTERS = [
  {
    title: 'From home to a salon',
    body: 'We started with a handful of neighbourhood dogs and a bathtub. People came back because their pets came home calm, not just tidy — so we kept the pace and moved everything else.',
  },
  {
    title: 'Cage-free, in practice',
    body: 'Cage-free is a scheduling decision before it is a room. We take fewer pets a day so nobody waits their turn in a crate, and drying happens in the open with a groomer in the room.',
  },
  {
    title: 'Certified, and still learning',
    body: 'Our groomers hold Singapore Kennel Club certification and train in low-stress handling. When a pet has had enough, we stop and finish another day rather than push through it.',
  },
]

export default async function AboutPage() {
  const content = await getSiteContent()
  const { business, hero, testimonials, stats } = content

  const credentials: { icon: IconName; title: string; body: string }[] = [
    {
      icon: 'certificate',
      title: 'SKC certified',
      body: 'Singapore Kennel Club certification, the local professional standard for groomers.',
    },
    {
      icon: 'paw',
      title: 'Low-stress handling',
      body: 'Trained to read the signs a pet is not coping, and to work around them rather than through them.',
    },
    {
      icon: 'bottle',
      title: 'Coat-matched products',
      body: 'Hypoallergenic shampoos and conditioners chosen per pet, with allergies noted on file.',
    },
  ]

  return (
    <>
      <Section tone="paper" className="border-b border-line">
        <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow">About</p>
            <h1 className="mt-4 max-w-xl text-4xl md:text-5xl">Grooming at the pet&apos;s pace</h1>
            <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-soft">
              {business.name} is a boutique salon in {business.locality}. No cages, no crate dryers, and no
              booking list so long that your pet spends the afternoon waiting.
            </p>
          </div>

          <Figure
            src={hero.image}
            alt={hero.imageAlt}
            ratio="aspect-[5/4]"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </div>
      </Section>

      {/* Story */}
      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="eyebrow">Our journey</p>
            <h2 className="mt-4 text-3xl">How we got here</h2>
          </div>

          <div className="space-y-10">
            {CHAPTERS.map((chapter, index) => (
              <article key={chapter.title} className="grid gap-4 border-t border-line pt-6 sm:grid-cols-[3rem_1fr]">
                <span className="font-display text-sm text-ink-muted tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="max-w-prose">
                  <h3 className="text-xl">{chapter.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{chapter.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* Credentials */}
      <Section tone="shell">
        <SectionHeader eyebrow="Credentials" title="What backs the work" />

        <div className="grid gap-px border border-line bg-line md:grid-cols-3">
          {credentials.map((credential) => (
            <article key={credential.title} className="bg-paper-card p-7 md:p-8">
              <Icon name={credential.icon} className="h-6 w-6 text-clay" />
              <h3 className="mt-5 text-xl">{credential.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{credential.body}</p>
            </article>
          ))}
        </div>

        {stats.length > 0 && (
          <dl className="mt-10 grid grid-cols-2 gap-8 border-t border-line pt-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="eyebrow">{stat.label}</dt>
                <dd className="font-display text-3xl text-ink md:text-4xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </Section>

      <TeamSection content={content} />

      {/* Testimonials — only shown once real ones are added to the content source. */}
      {testimonials.length > 0 && (
        <Section tone="paper">
          <SectionHeader eyebrow="In their words" title="What pet parents say" />
          <div className="grid gap-px border border-line bg-line md:grid-cols-3">
            {testimonials.slice(0, 6).map((testimonial) => (
              <TestimonialCard
                key={`${testimonial.name}-${testimonial.quote.slice(0, 12)}`}
                testimonial={testimonial}
              />
            ))}
          </div>
        </Section>
      )}

      <Section tone="ink">
        <div className="max-w-2xl">
          <h2 className="text-3xl text-paper md:text-4xl">Come and see the room</h2>
          <p className="mt-4 text-lg leading-relaxed text-paper/75">
            You are welcome to look around before you book. Message us and we will suggest a quiet time.
          </p>
          <div className="mt-8">
            <WhatsAppButton
              variant="whatsapp"
              size="lg"
              phoneNumber={business.whatsapp}
              message={WHATSAPP_MESSAGES.inquiry}
            >
              Message us
            </WhatsAppButton>
          </div>
        </div>
      </Section>
    </>
  )
}
