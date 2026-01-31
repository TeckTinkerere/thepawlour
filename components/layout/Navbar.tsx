'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const navLinks = [
    { href: '/services', label: 'Services', icon: '✨' },
    { href: '/about', label: 'About', icon: '❤️' },
    { href: '/contact', label: 'Contact', icon: '📞' },
  ]

  const isActiveLink = (href: string) => {
    return pathname === href
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-sm shadow-lg' 
            : 'bg-white/90'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity flex-shrink-0"
              aria-label="The Pawlour - Home"
            >
              <img 
                src="/icons/transparent_logo.png" 
                alt="The Pawlour Logo" 
                className="h-12 md:h-16 w-auto"
              />
              <div className="text-2xl md:text-3xl font-barlow tracking-wider text-gray-800 uppercase hidden sm:block">
                <span className="font-extralight">THE</span>
                <span className="font-medium ml-1">PAWLOUR</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium text-lg transition-colors duration-300 hover:text-terracotta ${
                    isActiveLink(link.href)
                      ? 'text-terracotta border-b-2 border-terracotta'
                      : 'text-gray-700'
                  }`}
                  aria-current={isActiveLink(link.href) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}
              
              <WhatsAppButton 
                variant="primary" 
                size="sm"
                message="Hello! I'd like to book a grooming appointment for my pet."
                phoneNumber="+6586689078"
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors z-50 relative"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span 
                  className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 ${
                    isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}
                />
                <span 
                  className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 mt-1 ${
                    isMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span 
                  className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 mt-1 ${
                    isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          {isMenuOpen && (
            <div 
              className="fixed inset-0 bg-black/20 md:hidden z-40"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />
          )}

          {/* Mobile Menu */}
          <div 
            id="mobile-menu"
            className={`md:hidden fixed left-0 right-0 top-20 bg-white shadow-xl transition-all duration-300 z-40 ${
              isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
          >
            <div className="container mx-auto px-4 py-6 space-y-2 max-h-[calc(100vh-80px)] overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-3 font-medium text-lg px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActiveLink(link.href)
                      ? 'bg-forest-green/10 text-forest-green border-l-4 border-forest-green'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-terracotta'
                  }`}
                  aria-current={isActiveLink(link.href) ? 'page' : undefined}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-200 mt-4">
                <WhatsAppButton 
                  variant="primary" 
                  size="lg"
                  message="Hello! I'd like to book a grooming appointment for my pet."
                  phoneNumber="+6586689078"
                  className="w-full justify-center"
                />
              </div>

              {/* Quick Links */}
              <div className="pt-4 border-t border-gray-200 mt-4 space-y-2">
                <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold px-4">Quick Links</p>
                <a 
                  href="tel:+6586689078"
                  className="flex items-center space-x-3 font-medium text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 hover:text-terracotta transition-all duration-300"
                >
                  <span className="text-xl">📱</span>
                  <span>Call Us</span>
                </a>
                <a 
                  href="https://wa.me/6586689078"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 font-medium text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 hover:text-terracotta transition-all duration-300"
                >
                  <span className="text-xl">💬</span>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-20 md:h-24" />
    </>
  )
}