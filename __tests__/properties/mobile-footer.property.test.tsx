import { render, screen, cleanup } from '@testing-library/react'
import MobileFooter from '@/components/layout/MobileFooter'

// Clean up after each test
afterEach(() => {
  cleanup()
})

describe('Mobile Footer Properties', () => {
  /**
   * Feature: pawlour-website, Property 2: Mobile Footer Consistency
   * For any page viewed on mobile viewport, the sticky footer with "Book on WhatsApp" button should be present and properly positioned
   * Validates: Requirements 1.3, 7.2
   */
  it('mobile footer should be present and properly positioned on all pages', () => {
    const { container } = render(<MobileFooter />)
    
    // Check that mobile footer is present
    const footer = container.querySelector('[role="contentinfo"]')
    expect(footer).toBeInTheDocument()
    expect(footer).toHaveAttribute('aria-label', 'Mobile booking footer')
    
    // Check that footer has proper positioning classes
    expect(footer).toHaveClass('fixed', 'bottom-0', 'left-0', 'right-0', 'z-40')
    
    // Check that footer is mobile-only (hidden on desktop)
    expect(footer).toHaveClass('md:hidden')
    
    // Check that WhatsApp button is present
    const whatsappButton = screen.getByRole('button', { name: /contact us on whatsapp/i })
    expect(whatsappButton).toBeInTheDocument()
    
    // Check that button has mobile variant styling
    expect(whatsappButton).toHaveClass('bg-green-500')
  })

  it('mobile footer should be hidden when isVisible is false', () => {
    const { container } = render(<MobileFooter isVisible={false} />)
    
    // Check that footer is not rendered when isVisible is false
    const footer = container.querySelector('[role="contentinfo"]')
    expect(footer).not.toBeInTheDocument()
  })

  it('mobile footer should have proper accessibility attributes', () => {
    render(<MobileFooter />)
    
    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveAttribute('aria-label', 'Mobile booking footer')
    
    const whatsappButton = screen.getByRole('button', { name: /contact us on whatsapp/i })
    expect(whatsappButton).toHaveAttribute('aria-label')
    expect(whatsappButton.getAttribute('aria-label')).toMatch(/contact us on whatsapp/i)
  })

  it('mobile footer should contain WhatsApp icon', () => {
    render(<MobileFooter />)
    
    const whatsappButton = screen.getByRole('button', { name: /contact us on whatsapp/i })
    const icon = whatsappButton.querySelector('svg')
    
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveAttribute('aria-hidden', 'true')
  })

  it('mobile footer should have backdrop blur and border styling', () => {
    const { container } = render(<MobileFooter />)
    
    const footerContent = container.querySelector('.bg-white\\/95')
    expect(footerContent).toBeInTheDocument()
    expect(footerContent).toHaveClass('backdrop-blur-sm', 'border-t', 'border-gray-200', 'shadow-lg')
  })

  it('mobile footer should have safe area support', () => {
    const { container } = render(<MobileFooter />)
    
    const safeArea = container.querySelector('.h-safe-area-inset-bottom')
    expect(safeArea).toBeInTheDocument()
  })
})