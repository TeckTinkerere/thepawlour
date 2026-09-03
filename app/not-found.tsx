import { Section } from '@/components/ui/Section'
import { ActionLink } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <Section tone="paper">
      <div className="max-w-xl py-10">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 text-4xl">That page has wandered off</h1>
        <p className="mt-4 leading-relaxed text-ink-soft">
          The link may be old or mistyped. The services list and our contact details are both a click away.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ActionLink href="/" variant="primary">
            Back to home
          </ActionLink>
          <ActionLink href="/services" variant="secondary">
            Services &amp; pricing
          </ActionLink>
        </div>
      </div>
    </Section>
  )
}
