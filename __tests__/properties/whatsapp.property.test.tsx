import fc from 'fast-check'
import {
  formatPhoneNumber,
  generateBookingMessage,
  generateWhatsAppURL,
  type BookingData,
} from '@/lib/whatsapp'

/**
 * Phone-number generators.
 *
 * These used to be written as `fc.string().filter(s => /^\d{8}$/.test(s))`,
 * which asks fast-check to stumble onto an exact eight-digit string by chance —
 * it effectively never does, and the suite hung. Numbers are built from digits
 * instead.
 */
const digits = (length: number) =>
  fc.array(fc.integer({ min: 0, max: 9 }), { minLength: length, maxLength: length }).map((d) => d.join(''))

const localNumber = digits(8)
const countryCodeNumber = digits(8).map((rest) => `65${rest}`)

describe('WhatsApp Integration Properties', () => {
  /**
   * Feature: pawlour-website, Property 8: WhatsApp Message Format
   * Validates: Requirements 5.6
   */
  it('booking message should follow exact format for any valid booking data', () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.string({ minLength: 1, maxLength: 50 }).filter((s) => s.trim().length > 0),
          petBreed: fc.string({ minLength: 1, maxLength: 30 }).filter((s) => s.trim().length > 0),
          preferredDate: fc.date().map((d) => d.toISOString().split('T')[0]),
        }),
        (bookingData: BookingData) => {
          const message = generateBookingMessage(bookingData)

          expect(message).toMatch(/^Hello The Pawlour!/)
          expect(message).toContain(`My name is ${bookingData.name}`)
          expect(message).toContain(`I have a ${bookingData.petBreed}`)
          expect(message).toContain(`I'd like to book an appointment on ${bookingData.preferredDate}`)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('any Singapore number normalises to 65 plus eight digits', () => {
    fc.assert(
      fc.property(
        fc.oneof(
          localNumber,
          countryCodeNumber,
          localNumber.map((n) => `+65${n}`),
          localNumber.map((n) => `65 ${n.slice(0, 4)} ${n.slice(4)}`),
          localNumber.map((n) => `(65) ${n.slice(0, 4)}-${n.slice(4)}`)
        ),
        (phoneInput) => {
          expect(formatPhoneNumber(phoneInput)).toMatch(/^65\d{8}$/)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('keeps the leading digit of a landline', () => {
    // Singapore landlines start with 6. Stripping it produced a dead wa.me link.
    expect(formatPhoneNumber('68123456')).toBe('6568123456')
    expect(formatPhoneNumber('+65 6812 3456')).toBe('6568123456')
  })

  it('WhatsApp URL should be properly encoded for any message', () => {
    fc.assert(
      fc.property(fc.string({ minLength: 1, maxLength: 200 }), countryCodeNumber, (message, phoneNumber) => {
        const url = generateWhatsAppURL(phoneNumber, message)

        expect(url).toMatch(/^https:\/\/wa\.me\//)
        expect(url).toContain(phoneNumber)
        expect(url).toContain('?text=')
        expect(() => new URL(url)).not.toThrow()

        // searchParams already decodes; decoding again throws on a literal "%".
        expect(new URL(url).searchParams.get('text')).toBe(message)
      }),
      { numRuns: 100 }
    )
  })

  it('booking message should handle special characters correctly', () => {
    const message = generateBookingMessage({
      name: "John O'Connor & Jane",
      petBreed: 'Golden Retriever (Mix)',
      preferredDate: '2024-12-25',
    })

    expect(message).toContain("John O'Connor & Jane")
    expect(message).toContain('Golden Retriever (Mix)')
    expect(message).toMatch(/^Hello The Pawlour! My name is .+ I have a .+ I'd like to book an appointment on .+/)
  })

  it('booking message should handle optional fields correctly', () => {
    const base: BookingData = { name: 'Alice Smith', petBreed: 'Poodle', preferredDate: '2024-12-20' }

    expect(generateBookingMessage({ ...base, service: 'Full Grooming' })).toContain(
      "I'm interested in Full Grooming"
    )
    expect(generateBookingMessage({ ...base, additionalNotes: 'My dog is very shy' })).toContain(
      'Additional notes: My dog is very shy'
    )

    const both = generateBookingMessage({ ...base, service: 'Spa Treatment', additionalNotes: 'First visit' })
    expect(both).toContain("I'm interested in Spa Treatment")
    expect(both).toContain('Additional notes: First visit')
  })

  it('phone number formatting should handle edge cases', () => {
    expect(formatPhoneNumber('86689078')).toBe('6586689078')
    expect(formatPhoneNumber('6586689078')).toBe('6586689078')
    expect(formatPhoneNumber('+6586689078')).toBe('6586689078')
    expect(formatPhoneNumber('65 1234 5678')).toBe('6512345678')
    expect(formatPhoneNumber('(65) 1234-5678')).toBe('6512345678')
  })
})
