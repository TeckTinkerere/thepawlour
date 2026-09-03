import type { ReactNode } from 'react'

type Tone = 'paper' | 'shell' | 'ink'

interface SectionProps {
  id?: string
  tone?: Tone
  children: ReactNode
  className?: string
}

const TONES: Record<Tone, string> = {
  paper: 'bg-paper text-ink-soft',
  shell: 'bg-paper-shell text-ink-soft',
  ink: 'bg-ink text-paper',
}

/** Consistent vertical rhythm, so every section is not inventing its own. */
export function Section({ id, tone = 'paper', children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`${TONES[tone]} py-16 md:py-24 ${className}`}>
      <div className="container">{children}</div>
    </section>
  )
}

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  intro?: string
  /** Left-aligned reads as editorial; centre is reserved for the closing CTA. */
  align?: 'left' | 'center'
  onInk?: boolean
}

export function SectionHeader({ eyebrow, title, intro, align = 'left', onInk = false }: SectionHeaderProps) {
  const centered = align === 'center'
  return (
    <header className={`${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} mb-10 md:mb-14`}>
      {eyebrow && <p className={`eyebrow mb-3 ${onInk ? 'text-paper/60' : ''}`}>{eyebrow}</p>}
      <h2 className={`text-3xl md:text-4xl ${onInk ? 'text-paper' : ''}`}>{title}</h2>
      {intro && (
        <p className={`mt-4 text-lg leading-relaxed ${onInk ? 'text-paper/75' : 'text-ink-soft'}`}>{intro}</p>
      )}
    </header>
  )
}
