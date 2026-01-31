import { render, screen, cleanup } from '@testing-library/react'
import fc from 'fast-check'
import Navbar from '@/components/layout/Navbar'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}))

// Clean up after each test
afterEach(() => {
  cleanup()
})

describe('Navigation Properties', () => {
  /**
   * Feature: pawlour-website, Property 3: Navigation Consistency
   * For any page in the website, the navigation structure and styling should be identical across all pages
   * Validates: Requirements 1.4
   */
  it('navigation structure should be consistent across all pages', () => {
    const pathnames = ['/', '/about', '/services', '/contact']
    
    pathnames.forEach(pathname => {
      // Mock the pathname for this test
      const { usePathname } = require('next/navigation')
      usePathname.mockReturnValue(pathname)
      
      const { container } = render(<Navbar />)
      
      // Check that navigation contains required elements
      const nav = container.querySelector('nav')
      expect(nav).toBeInTheDocument()
      expect(nav).toHaveAttribute('role', 'navigation')
      
      // Check logo is present
      const logos = screen.getAllByLabelText(/the pawlour.*home/i)
      expect(logos.length).toBeGreaterThan(0)
      
      // Check all navigation links are present (using getAllByRole to handle duplicates)
      const servicesLinks = screen.getAllByRole('link', { name: /services/i })
      const aboutLinks = screen.getAllByRole('link', { name: /about/i })
      const contactLinks = screen.getAllByRole('link', { name: /contact/i })
      
      expect(servicesLinks.length).toBeGreaterThan(0)
      expect(aboutLinks.length).toBeGreaterThan(0)
      expect(contactLinks.length).toBeGreaterThan(0)
      
      // Check WhatsApp button is present
      const whatsappButtons = screen.getAllByRole('button', { name: /contact us on whatsapp/i })
      expect(whatsappButtons.length).toBeGreaterThan(0)
      
      // Check mobile menu button is present
      const mobileMenuButtons = screen.getAllByLabelText(/toggle navigation menu/i)
      expect(mobileMenuButtons.length).toBeGreaterThan(0)
      
      // Check navigation has consistent styling classes
      expect(nav).toHaveClass('fixed', 'top-0', 'left-0', 'right-0', 'z-50')
      
      cleanup()
    })
  })

  /**
   * Feature: pawlour-website, Property 4: Navigation Link Functionality  
   * For any navigation link clicked, the website should navigate to the correct corresponding page
   * Validates: Requirements 1.5
   */
  it('navigation links should point to correct pages', () => {
    const linkData = [
      { href: '/services', label: 'Services' },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' }
    ]
    
    linkData.forEach(data => {
      render(<Navbar />)
      
      const links = screen.getAllByRole('link', { name: new RegExp(data.label, 'i') })
      // Check that at least one link exists and all links point to the correct href
      expect(links.length).toBeGreaterThan(0)
      links.forEach(link => {
        expect(link).toHaveAttribute('href', data.href)
      })
      
      cleanup()
    })
  })

  it('should have proper accessibility attributes', () => {
    render(<Navbar />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', 'Main navigation')
    
    const skipLink = screen.getByText('Skip to main content')
    expect(skipLink).toHaveClass('skip-link')
    
    const mobileMenuButton = screen.getByLabelText(/toggle navigation menu/i)
    expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false')
    expect(mobileMenuButton).toHaveAttribute('aria-controls', 'mobile-menu')
  })

  it('should highlight active page in navigation', () => {
    const { usePathname } = require('next/navigation')
    usePathname.mockReturnValue('/about')
    
    render(<Navbar />)
    
    const aboutLinks = screen.getAllByRole('link', { name: /about/i })
    // Check that at least one about link has the active state
    const activeLinks = aboutLinks.filter(link => 
      link.getAttribute('aria-current') === 'page' &&
      link.classList.contains('text-terracotta')
    )
    expect(activeLinks.length).toBeGreaterThan(0)
  })
})