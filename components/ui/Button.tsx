import Link from 'next/link'
import type { ReactNode } from 'react'
import Icon from './Icon'

type Variant = 'primary' | 'secondary' | 'ghost' | 'whatsapp'

const BASE =
  'inline-flex items-center justify-center gap-2 rounded font-medium transition-colors duration-150 disabled:opacity-60'

const VARIANTS: Record<Variant, string> = {
  // Solid ink, the way the wordmark is printed.
  primary: 'bg-ink text-paper hover:bg-ink-soft',
  secondary: 'border border-ink text-ink hover:bg-ink hover:text-paper',
  ghost: 'text-ink hover:text-clay',
  whatsapp: 'bg-whatsapp text-white hover:bg-whatsapp/90',
}

const SIZES = {
  sm: 'px-3.5 py-2 text-sm',
  md: 'px-5 py-2.5 text-[0.95rem]',
  lg: 'px-6 py-3.5 text-base',
} as const

export function buttonClass(variant: Variant = 'primary', size: keyof typeof SIZES = 'md', className = '') {
  return `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`
}

interface ActionLinkProps {
  href: string
  variant?: Variant
  size?: keyof typeof SIZES
  className?: string
  external?: boolean
  children: ReactNode
}

/** A link that looks like a button. Used for tel:, wa.me and internal routes. */
export function ActionLink({
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  external = false,
  children,
}: ActionLinkProps) {
  const classes = buttonClass(variant, size, className)

  if (external || href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) {
    const isHttp = href.startsWith('http')
    return (
      <a
        href={href}
        className={classes}
        {...(isHttp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}

/** Quiet inline "next step" link with a moving arrow on hover. */
export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-2 font-medium text-ink hover:text-clay">
      <span className="underline decoration-line-strong underline-offset-4 group-hover:decoration-clay">
        {children}
      </span>
      <Icon name="arrow-right" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  )
}
