'use client'

import { useEffect, useRef, useState } from 'react'
import Icon from '@/components/ui/Icon'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import type { Business } from '@/lib/content/types'

interface MobileFooterProps {
  business: Business
  isVisible?: boolean
}

/**
 * Sticky booking bar for small screens.
 *
 * Two actions rather than one: some people will always rather call than type.
 * The scroll position is held in a ref, so the listener is attached once
 * instead of being torn down and re-added on every scroll event.
 */
export default function MobileFooter({ business, isVisible = true }: MobileFooterProps) {
  const [isShown, setIsShown] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsShown(currentScrollY < lastScrollY.current || currentScrollY < 120)
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div
      role="region"
      aria-label="Book an appointment"
      className={`fixed bottom-0 left-0 right-0 z-40 border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm transition-transform duration-300 md:hidden ${
        isShown ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="container flex items-center gap-2 py-3">
        <a
          href={`tel:${business.phone.replace(/\s/g, '')}`}
          className="inline-flex items-center justify-center gap-2 rounded border border-ink px-4 py-3 text-sm font-medium text-ink"
          aria-label={`Call ${business.name}`}
        >
          <Icon name="phone" className="h-4 w-4" />
          Call
        </a>
        <WhatsAppButton
          variant="whatsapp"
          size="lg"
          phoneNumber={business.whatsapp}
          className="flex-1"
        >
          Book on WhatsApp
        </WhatsAppButton>
      </div>
    </div>
  )
}
