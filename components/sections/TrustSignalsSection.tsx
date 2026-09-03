import Icon, { type IconName } from '@/components/ui/Icon'
import { Section, SectionHeader } from '@/components/ui/Section'
import type { SiteContent } from '@/lib/content'

/**
 * Why the salon is different, plus the numbers behind it.
 *
 * The stats are read from content so the homepage and the reviews block can
 * never disagree about how many pets have been through the door.
 */
export default function TrustSignalsSection({ content }: { content: SiteContent }) {
  const { highlights, stats } = content

  return (
    <Section tone="shell">
      <SectionHeader
        eyebrow="Why The Pawlour"
        title="A calmer way to groom"
        intro="Three things shape every appointment we take."
      />

      <div className="grid gap-px border border-line bg-line md:grid-cols-3">
        {highlights.map((highlight) => (
          <article key={highlight.title} className="bg-paper-card p-7 md:p-8">
            <Icon name={highlight.icon as IconName} className="h-6 w-6 text-clay" />
            <h3 className="mt-5 text-xl">{highlight.title}</h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{highlight.description}</p>
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
  )
}
