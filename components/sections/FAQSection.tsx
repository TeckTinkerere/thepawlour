'use client'

import { useId, useMemo, useState } from 'react'
import Icon from '@/components/ui/Icon'
import { Section, SectionHeader } from '@/components/ui/Section'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import type { SiteContent } from '@/lib/content'

/**
 * Accessible accordion.
 *
 * The previous version put the answer text *inside* the toggle button, so
 * screen readers read the whole answer as part of the control's name, and there
 * was no aria-expanded to say whether it was open. Here the button controls a
 * sibling region, and answers stay in the DOM for search engines and Ctrl+F.
 */
export default function FAQSection({ content }: { content: SiteContent }) {
  const { faqs, business } = content
  const baseId = useId()
  const [openQuestion, setOpenQuestion] = useState<string | null>(null)
  const [category, setCategory] = useState<string>('All')

  const categories = useMemo(() => {
    const seen = faqs.map((faq) => faq.category).filter(Boolean)
    return ['All', ...Array.from(new Set(seen))]
  }, [faqs])

  const visible = category === 'All' ? faqs : faqs.filter((faq) => faq.category === category)

  if (faqs.length === 0) return null

  return (
    <Section tone="paper">
      <SectionHeader
        eyebrow="Questions"
        title="Before your first visit"
        intro="The things pet parents ask us most. Anything else, just message."
      />

      {categories.length > 2 && (
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter questions by topic">
          {categories.map((option) => {
            const active = option === category
            return (
              <button
                key={option}
                type="button"
                onClick={() => setCategory(option)}
                aria-pressed={active}
                className={`border px-3.5 py-1.5 text-sm transition-colors ${
                  active
                    ? 'border-ink bg-ink text-paper'
                    : 'border-line text-ink-soft hover:border-line-strong hover:text-ink'
                }`}
              >
                {option}
              </button>
            )
          })}
        </div>
      )}

      <div className="max-w-3xl divide-y divide-line border-y border-line">
        {visible.map((faq, index) => {
          const isOpen = openQuestion === faq.question
          const panelId = `${baseId}-panel-${index}`
          const buttonId = `${baseId}-button-${index}`

          return (
            <div key={faq.question}>
              <h3>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenQuestion(isOpen ? null : faq.question)}
                  className="flex w-full items-start justify-between gap-6 py-5 text-left font-display text-lg text-ink transition-colors hover:text-clay"
                >
                  {faq.question}
                  <Icon
                    name="chevron-down"
                    className={`mt-1 h-4 w-4 flex-none text-ink-muted transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </h3>
              <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen}>
                <p className="max-w-prose pb-6 leading-relaxed text-ink-soft">{faq.answer}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <p className="text-ink-soft">Still unsure what your pet needs?</p>
        <WhatsAppButton
          variant="secondary"
          phoneNumber={business.whatsapp}
          message="Hello The Pawlour! I have a question about your services."
        >
          Ask us
        </WhatsAppButton>
      </div>
    </Section>
  )
}
