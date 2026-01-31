import fc from 'fast-check'
import { 
  formatPhoneNumber, 
  generateBookingMessage, 
  generateWhatsAppURL,
  type BookingData 
} from '@/lib/whatsapp'

describe('WhatsApp Integration Properties', () => {
  /**
   * Feature: pawlour-website, Property 8: WhatsApp Message Format
   * For any booking form data, the generated WhatsApp message should follow the exact format: 
   * "Hello The Pawlour! My name is {Name}. I have a {Pet Breed}. I'd like to book an appointment on {Date}."
   * Validates: Requirements 5.6
   */
  it('booking message should follow exact format for any valid booking data', () => {
    fc.assert(fc.property(
      fc.record({
        name: fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
        petBreed: fc.string({ minLength: 1, maxLength: 30 }).filter(s => s.trim().length > 0),
        preferredDate: fc.date().map(d => d.toISOString().split('T')[0]) // YYYY-MM-DD format
      }),
      (bookingData: BookingData) => {
        const message = generateBookingMessage(bookingData)
        
        // Check that message starts with the correct greeting
        expect(message).toMatch(/^Hello The Pawlour!/)
        
        // Check that message contains the name
        expect(message).toContain(`My name is ${bookingData.name}`)
        
        // Check that message contains the pet breed
        expect(message).toContain(`I have a ${bookingData.petBreed}`)
        
        // Check that message contains the preferred date
        expect(message).toContain(`I'd like to book an appointment on ${bookingData.preferredDate}`)
        
        // Check the exact format structure
        const expectedPattern = new RegExp(
          `^Hello The Pawlour! My name is ${escapeRegExp(bookingData.name)}\\. I have a ${escapeRegExp(bookingData.petBreed)}\\. I'd like to book an appointment on ${escapeRegExp(bookingData.preferredDate)}\\.`
        )
        expect(message).toMatch(expectedPattern)
      }
    ), { numRuns: 100 })
  })

  it('phone number formatting should work for any Singapore number', () => {
    fc.assert(fc.property(
      fc.oneof(
        fc.string().filter(s => /^\d{8}$/.test(s)), // 8-digit local number
        fc.string().filter(s => /^6\d{7}$/.test(s)), // 8-digit starting with 6
        fc.string().filter(s => /^65\d{8}$/.test(s)), // Full Singapore number
        fc.string().filter(s => /^\+65\d{8}$/.test(s)), // With + prefix
        fc.string().filter(s => /^65 \d{4} \d{4}$/.test(s)) // With spaces
      ),
      (phoneInput) => {
        const formatted = formatPhoneNumber(phoneInput)
        
        // Should always start with 65
        expect(formatted).toMatch(/^65/)
        
        // Should be exactly 10 digits (65 + 8 digits)
        expect(formatted).toMatch(/^65\d{8}$/)
        
        // Should contain only digits
        expect(formatted).toMatch(/^\d+$/)
      }
    ), { numRuns: 100 })
  })

  it('WhatsApp URL should be properly encoded for any message', () => {
    fc.assert(fc.property(
      fc.string({ minLength: 1, maxLength: 200 }),
      fc.string().filter(s => /^65\d{8}$/.test(s)),
      (message, phoneNumber) => {
        const url = generateWhatsAppURL(phoneNumber, message)
        
        // Should start with WhatsApp URL format
        expect(url).toMatch(/^https:\/\/wa\.me\//)
        
        // Should contain the phone number
        expect(url).toContain(phoneNumber)
        
        // Should contain encoded message parameter
        expect(url).toContain('?text=')
        
        // Should be a valid URL
        expect(() => new URL(url)).not.toThrow()
        
        // Message should be properly URL encoded
        const urlObj = new URL(url)
        const decodedMessage = decodeURIComponent(urlObj.searchParams.get('text') || '')
        expect(decodedMessage).toBe(message)
      }
    ), { numRuns: 100 })
  })

  it('booking message should handle special characters correctly', () => {
    const specialCharData: BookingData = {
      name: "John O'Connor & Jane",
      petBreed: "Golden Retriever (Mix)",
      preferredDate: "2024-12-25"
    }
    
    const message = generateBookingMessage(specialCharData)
    
    // Should contain all the special characters
    expect(message).toContain("John O'Connor & Jane")
    expect(message).toContain("Golden Retriever (Mix)")
    
    // Should still follow the format
    expect(message).toMatch(/^Hello The Pawlour! My name is .+ I have a .+ I'd like to book an appointment on .+/)
  })

  it('booking message should handle optional fields correctly', () => {
    const baseData: BookingData = {
      name: "Alice Smith",
      petBreed: "Poodle",
      preferredDate: "2024-12-20"
    }
    
    // Test with service
    const withService = { ...baseData, service: "Full Grooming" }
    const messageWithService = generateBookingMessage(withService)
    expect(messageWithService).toContain("I'm interested in Full Grooming")
    
    // Test with additional notes
    const withNotes = { ...baseData, additionalNotes: "My dog is very shy" }
    const messageWithNotes = generateBookingMessage(withNotes)
    expect(messageWithNotes).toContain("Additional notes: My dog is very shy")
    
    // Test with both
    const withBoth = { ...baseData, service: "Spa Treatment", additionalNotes: "First time visit" }
    const messageWithBoth = generateBookingMessage(withBoth)
    expect(messageWithBoth).toContain("I'm interested in Spa Treatment")
    expect(messageWithBoth).toContain("Additional notes: First time visit")
  })

  it('phone number formatting should handle edge cases', () => {
    // Test various input formats
    expect(formatPhoneNumber('86689078')).toBe('6586689078')
    expect(formatPhoneNumber('686689078')).toBe('6586689078')
    expect(formatPhoneNumber('6586689078')).toBe('6586689078')
    expect(formatPhoneNumber('+6586689078')).toBe('6586689078')
    expect(formatPhoneNumber('65 1234 5678')).toBe('6586689078')
    expect(formatPhoneNumber('(65) 1234-5678')).toBe('6586689078')
  })
})

// Helper function to escape special regex characters
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}