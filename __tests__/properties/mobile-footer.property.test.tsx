import { render, screen, cleanup } from '@testing-library/react'
import MobileFooter from '@/components/layout/MobileFooter'
import { getDefaultContent } from '@/lib/content'

const business = getDefaultContent().business

afterEach(cleanup)

describe('Mobile booking bar', () => {
  /**
   * Feature: pawlour-website, Property 2: Mobile Footer Consistency
   * The sticky booking bar is present and pinned to the bottom on mobile.
   */
  it('is pinned to the bottom and hidden on desktop', () => {
    const { container } = render(<MobileFooter business={business} />)

    const bar = container.querySelector('[role="region"]')
    expect(bar).toBeInTheDocument()
    expect(bar).toHaveAttribute('aria-label', 'Book an appointment')
    expect(bar).toHaveClass('fixed', 'bottom-0', 'left-0', 'right-0', 'z-40', 'md:hidden')
  })

  it('offers both WhatsApp and a phone call', () => {
    render(<MobileFooter business={business} />)

    const whatsapp = screen.getByRole('link', { name: /book on whatsapp/i })
    expect(whatsapp).toHaveAttribute('href', expect.stringContaining('wa.me/'))
    expect(whatsapp).toHaveAttribute('target', '_blank')
    expect(whatsapp).toHaveAttribute('rel', expect.stringContaining('noopener'))

    const call = screen.getByRole('link', { name: /call the pawlour/i })
    expect(call).toHaveAttribute('href', 'tel:+6586689078')
  })

  it('renders nothing when hidden', () => {
    const { container } = render(<MobileFooter business={business} isVisible={false} />)
    expect(container.querySelector('[role="region"]')).not.toBeInTheDocument()
  })

  it('keeps the WhatsApp mark out of the accessibility tree', () => {
    render(<MobileFooter business={business} />)

    const icon = screen.getByRole('link', { name: /book on whatsapp/i }).querySelector('svg')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveAttribute('aria-hidden', 'true')
  })

  it('clears the phone home indicator', () => {
    const { container } = render(<MobileFooter business={business} />)
    const bar = container.querySelector('[role="region"]') as HTMLElement
    expect(bar).toHaveClass('pb-[env(safe-area-inset-bottom)]')
  })
})
