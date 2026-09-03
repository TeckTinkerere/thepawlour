import { generateWhatsAppURL, PAWLOUR_WHATSAPP } from '@/lib/whatsapp'
import { buttonClass } from './Button'
import Icon from './Icon'

interface WhatsAppButtonProps {
  message?: string
  phoneNumber?: string
  variant?: 'primary' | 'secondary' | 'whatsapp'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children?: React.ReactNode
  /** Set false on repeat CTAs so the icon does not tile down the page. */
  showIcon?: boolean
}

/**
 * Booking is a link, not a button.
 *
 * This used to be a <button> that called window.open, which pop-up blockers
 * catch, middle-click and "open in new tab" ignore, and screen readers announce
 * as an action with no destination. An anchor to wa.me hands off to the
 * WhatsApp app on mobile and web.whatsapp.com on desktop for free.
 */
export default function WhatsAppButton({
  message = "Hello! I'd like to book a grooming appointment for my pet.",
  phoneNumber = PAWLOUR_WHATSAPP,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  showIcon = true,
}: WhatsAppButtonProps) {
  const href = generateWhatsAppURL(phoneNumber, message)
  const iconSize = size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClass(variant, size, className)}
      data-analytics="whatsapp-click"
    >
      {showIcon && <Icon name="whatsapp" className={iconSize} />}
      {children ?? 'Book on WhatsApp'}
    </a>
  )
}
