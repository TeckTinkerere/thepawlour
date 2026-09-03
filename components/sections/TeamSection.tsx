import Image from 'next/image'
import { Section, SectionHeader } from '@/components/ui/Section'
import type { SiteContent } from '@/lib/content'

/** Initials stand in until the salon adds a real photo. */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

/**
 * The team, read from content.
 *
 * Renders nothing until the salon adds real people: the previous version listed
 * three invented groomers illustrated with stock headshots of strangers.
 * Add rows to the Team tab (or content/site.json) and the section appears.
 */
export default function TeamSection({ content }: { content: SiteContent }) {
  const { team } = content
  if (team.length === 0) return null

  return (
    <Section tone="shell">
      <SectionHeader
        eyebrow="The team"
        title="Who will be handling your pet"
        intro="Every groom is done by a named person, not a rota you never meet."
      />

      <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member) => (
          <article key={member.name} className="bg-paper-card p-7">
            <div className="relative mb-6 aspect-[4/5] w-full overflow-hidden border border-line bg-paper-shell">
              {member.photo ? (
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center font-display text-4xl tracking-wordmark text-line-strong">
                  {initials(member.name)}
                </span>
              )}
            </div>

            <h3 className="text-xl">{member.name}</h3>
            <p className="mt-1 text-sm text-clay">{member.role}</p>

            <dl className="mt-5 space-y-3 border-t border-line pt-5 text-sm">
              {member.specialty && (
                <div>
                  <dt className="eyebrow">Specialty</dt>
                  <dd className="mt-1 text-ink-soft">{member.specialty}</dd>
                </div>
              )}
              {member.experience && (
                <div>
                  <dt className="eyebrow">Experience</dt>
                  <dd className="mt-1 text-ink-soft">{member.experience}</dd>
                </div>
              )}
            </dl>

            {member.certifications.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2">
                {member.certifications.map((certification) => (
                  <li key={certification} className="border border-line px-2.5 py-1 text-xs text-ink-muted">
                    {certification}
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </Section>
  )
}
