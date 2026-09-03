'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Icon from '@/components/ui/Icon'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import type { Business } from '@/lib/content/types'

const NAV_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

interface NavbarProps {
  business: Business
  /** Short notice shown above the bar — holiday hours, fully booked, etc. */
  announcement?: string
}

export default function Navbar({ business, announcement }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close the menu on navigation.
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Lock the page behind the open menu.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  // Escape closes the menu, as a dialog-like overlay should.
  useEffect(() => {
    if (!isMenuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isMenuOpen])

  const isActive = (href: string) => pathname === href

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {announcement && (
        <p className="bg-ink px-4 py-2 text-center text-sm text-paper/90">{announcement}</p>
      )}

      <header
        className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-sm"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container flex h-16 items-center justify-between gap-6 md:h-20">
          <Link href="/" className="flex items-center gap-3" aria-label={`${business.name} - Home`}>
            <Image
              src="/icons/transparent_logo.png"
              alt=""
              width={48}
              height={48}
              className="h-10 w-10 md:h-12 md:w-12"
              priority
            />
            <span className="font-display text-lg uppercase tracking-wordmark text-ink md:text-xl">
              <span className="font-light">The</span>
              <span className="ml-1.5 font-medium">Pawlour</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={`border-b-2 pb-1 text-[0.95rem] transition-colors ${
                  isActive(link.href)
                    ? 'border-clay text-ink'
                    : 'border-transparent text-ink-soft hover:text-ink'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <WhatsAppButton variant="primary" size="sm" phoneNumber={business.whatsapp}>
              Book
            </WhatsAppButton>
          </nav>

          <button
            type="button"
            className="-mr-2 p-2 text-ink md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <Icon name={isMenuOpen ? 'close' : 'menu'} className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          hidden={!isMenuOpen}
          className="border-t border-line bg-paper md:hidden"
        >
          <div className="container flex flex-col py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={`border-b border-line py-3.5 text-lg ${
                  isActive(link.href) ? 'text-clay' : 'text-ink'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <a
              href={`tel:${business.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-3 border-b border-line py-3.5 text-lg text-ink"
            >
              <Icon name="phone" className="h-4 w-4 text-ink-muted" />
              {business.phone}
            </a>

            <WhatsAppButton
              variant="primary"
              size="lg"
              phoneNumber={business.whatsapp}
              className="mt-5 w-full"
            >
              Book on WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </header>
    </>
  )
}
