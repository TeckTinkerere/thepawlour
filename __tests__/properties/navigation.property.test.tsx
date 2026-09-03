import { render, screen, cleanup } from '@testing-library/react'
import Navbar from '@/components/layout/Navbar'
import { getDefaultContent } from '@/lib/content'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}))

const business = getDefaultContent().business

afterEach(cleanup)

describe('Navigation', () => {
  /**
   * Feature: pawlour-website, Property 3: Navigation Consistency
   * The navigation structure is identical on every page.
   */
  it('renders the same structure on every page', () => {
    const { usePathname } = require('next/navigation')

    for (const pathname of ['/', '/about', '/services', '/contact']) {
      usePathname.mockReturnValue(pathname)
      const { container } = render(<Navbar business={business} />)

      const nav = container.querySelector('[role="navigation"]')
      expect(nav).toBeInTheDocument()
      expect(nav).toHaveAttribute('aria-label', 'Main navigation')

      expect(screen.getAllByLabelText(/the pawlour - home/i).length).toBeGreaterThan(0)
      expect(screen.getAllByRole('link', { name: /services/i }).length).toBeGreaterThan(0)
      expect(screen.getAllByRole('link', { name: /about/i }).length).toBeGreaterThan(0)
      expect(screen.getAllByRole('link', { name: /contact/i }).length).toBeGreaterThan(0)

      // Booking is a link to wa.me, not a button that calls window.open.
      const booking = screen.getAllByRole('link', { name: /book/i })
      expect(booking.length).toBeGreaterThan(0)
      expect(booking[0]).toHaveAttribute('href', expect.stringContaining('wa.me/'))

      cleanup()
    }
  })

  /**
   * Feature: pawlour-website, Property 4: Navigation Link Functionality
   */
  it('points each link at its page', () => {
    for (const { href, label } of [
      { href: '/services', label: 'Services' },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ]) {
      render(<Navbar business={business} />)

      const links = screen.getAllByRole('link', { name: new RegExp(label, 'i') })
      expect(links.length).toBeGreaterThan(0)
      links.forEach((link) => expect(link).toHaveAttribute('href', href))

      cleanup()
    }
  })

  it('exposes the menu toggle to assistive technology', () => {
    render(<Navbar business={business} />)

    expect(screen.getByText('Skip to main content')).toHaveClass('skip-link')

    const toggle = screen.getByLabelText(/open navigation menu/i)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveAttribute('aria-controls', 'mobile-menu')
  })

  it('marks the current page', () => {
    const { usePathname } = require('next/navigation')
    usePathname.mockReturnValue('/about')

    render(<Navbar business={business} />)

    const active = screen
      .getAllByRole('link', { name: /about/i })
      .filter((link) => link.getAttribute('aria-current') === 'page')

    expect(active.length).toBeGreaterThan(0)
  })

  it('shows an announcement only when the content supplies one', () => {
    const { container } = render(<Navbar business={business} />)
    expect(container.textContent).not.toContain('Closed for renovation')
    cleanup()

    render(<Navbar business={business} announcement="Closed for renovation" />)
    expect(screen.getByText('Closed for renovation')).toBeInTheDocument()
  })
})
