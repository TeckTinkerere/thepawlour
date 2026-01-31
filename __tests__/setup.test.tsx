import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Test Setup', () => {
  it('renders the home page', () => {
    render(<Home />)
    
    const heading = screen.getByRole('heading', {
      name: /welcome to the pawlour/i,
    })
    
    expect(heading).toBeInTheDocument()
  })
  
  it('has proper test environment setup', () => {
    expect(typeof window).toBe('object')
    expect(typeof document).toBe('object')
  })
})