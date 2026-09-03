import { Section } from '@/components/ui/Section'
import { TextLink } from '@/components/ui/Button'
import type { SiteContent } from '@/lib/content'

export default function MiniAboutSection({ content }: { content: SiteContent }) {
  const { business } = content

  return (
    <Section tone="paper">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="eyebrow">Our story</p>
          <h2 className="mt-4 text-3xl md:text-4xl">
            From a home setup to a Hougang salon
          </h2>
        </div>

        <div className="max-w-prose space-y-5 text-lg leading-relaxed text-ink-soft">
          <p>
            {business.name} started at home, grooming a handful of neighbourhood dogs. The reason people kept
            coming back was never the equipment — it was that nobody was rushed, and nobody was left in a crate
            waiting their turn.
          </p>
          <p>
            The salon is bigger now and the team is certified, but the working day is still built around that:
            a short booking list, an open drying area, and time to stop when a pet has had enough.
          </p>
          <p className="text-ink">Every pet deserves to look and feel their best.</p>
          <div className="pt-2">
            <TextLink href="/about">More about how we work</TextLink>
          </div>
        </div>
      </div>
    </Section>
  )
}
