/**
 * The site's whole icon set: single-weight 1.5px strokes on a 24px grid.
 *
 * This exists so no section reaches for an emoji. Emoji render differently on
 * every platform, carry their own colour, and read as filler next to a
 * letterpress wordmark.
 */

export type IconName =
  | 'paw'
  | 'open-space'
  | 'certificate'
  | 'bottle'
  | 'scissors'
  | 'clock'
  | 'pin'
  | 'phone'
  | 'whatsapp'
  | 'arrow-right'
  | 'chevron-down'
  | 'check'
  | 'star'
  | 'menu'
  | 'close'

interface IconProps {
  name: IconName
  className?: string
}

const PATHS: Record<Exclude<IconName, 'whatsapp' | 'star'>, React.ReactNode> = {
  paw: (
    <>
      <ellipse cx="7" cy="9" rx="2" ry="2.6" />
      <ellipse cx="12" cy="7" rx="2" ry="2.8" />
      <ellipse cx="17" cy="9" rx="2" ry="2.6" />
      <path d="M12 12.5c-2.6 0-4.6 1.8-4.6 3.9 0 1.6 1.2 2.6 2.8 2.6h3.6c1.6 0 2.8-1 2.8-2.6 0-2.1-2-3.9-4.6-3.9Z" />
    </>
  ),
  'open-space': (
    <>
      <path d="M3 10.5 12 4l9 6.5" />
      <path d="M5 10v9h14v-9" />
      <path d="M12 19v-4.5" />
    </>
  ),
  certificate: (
    <>
      <circle cx="12" cy="9.5" r="5.5" />
      <path d="M9 14.5 8 21l4-2 4 2-1-6.5" />
    </>
  ),
  bottle: (
    <>
      <path d="M10 3h4v3l1.6 2.4a3 3 0 0 1 .4 1.6V19a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-9a3 3 0 0 1 .4-1.6L10 6V3Z" />
      <path d="M8 13h8" />
    </>
  ),
  scissors: (
    <>
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="6" cy="6" r="2.5" />
      <path d="M8.1 7.6 20 18M20 6 8.1 16.4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6.5-6 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 15 12 21 12 21Z" />
      <circle cx="12" cy="10.5" r="2.3" />
    </>
  ),
  phone: (
    <path d="M6.2 3.5h2.9l1.4 3.6-1.8 1.4a11.5 11.5 0 0 0 5 5l1.4-1.8 3.6 1.4v2.9a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.2 5.7a2 2 0 0 1 2-2.2Z" />
  ),
  'arrow-right': <path d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5" />,
  'chevron-down': <path d="m6 9.5 6 6 6-6" />,
  check: <path d="m4.5 12.5 5 5 10-11" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
}

export default function Icon({ name, className = 'h-5 w-5' }: IconProps) {
  // WhatsApp and the review star are solid marks, not line drawings.
  if (name === 'whatsapp') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.458-8.411" />
      </svg>
    )
  }

  if (name === 'star') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="m12 3.6 2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L3.5 9.8l5.9-.9L12 3.6Z" />
      </svg>
    )
  }

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  )
}
