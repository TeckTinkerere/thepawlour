/**
 * WhatsApp integration utilities for The Pawlour website
 */

export interface BookingData {
  name: string
  petBreed: string
  preferredDate: string
  service?: string
  additionalNotes?: string
}

/**
 * Normalises a phone number into the digits wa.me expects.
 *
 * Singapore numbers are eight digits, and landlines start with 6 — the previous
 * version treated that leading 6 as half a country code and stripped it, so
 * "68123456" became "658123456" and produced a dead WhatsApp link. Only a
 * genuine 65 country code is now recognised.
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')

  // A local eight-digit number: add the country code.
  if (cleaned.length === 8) return `65${cleaned}`

  // Already carries the 65 country code.
  if (cleaned.length === 10 && cleaned.startsWith('65')) return cleaned

  // Anything else (an overseas number, or a typo) is passed through with a
  // country code only when it clearly lacks one.
  return cleaned.startsWith('65') ? cleaned : `65${cleaned}`
}

/**
 * Generates WhatsApp message for booking appointments
 * Follows the format specified in requirements: 
 * "Hello The Pawlour! My name is {Name}. I have a {Pet Breed}. I'd like to book an appointment on {Date}."
 */
export function generateBookingMessage(data: BookingData): string {
  let message = `Hello The Pawlour! My name is ${data.name}. I have a ${data.petBreed}. I'd like to book an appointment on ${data.preferredDate}.`
  
  if (data.service) {
    message += ` I'm interested in ${data.service}.`
  }
  
  if (data.additionalNotes) {
    message += ` Additional notes: ${data.additionalNotes}`
  }
  
  return message
}

/**
 * Generates complete WhatsApp URL with message
 */
export function generateWhatsAppURL(phoneNumber: string, message: string): string {
  const formattedPhone = formatPhoneNumber(phoneNumber)
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${formattedPhone}?text=${encodedMessage}`
}

/**
 * Opens WhatsApp with pre-filled message
 */
export function openWhatsApp(phoneNumber: string, message: string): void {
  const url = generateWhatsAppURL(phoneNumber, message)
  window.open(url, '_blank', 'noopener,noreferrer')
}

/**
 * Default phone number for The Pawlour
 */
export const PAWLOUR_WHATSAPP = '+6586689078'

/**
 * Common WhatsApp messages
 */
export const WHATSAPP_MESSAGES = {
  general: "Hello! I'd like to book a grooming appointment for my pet.",
  inquiry: "Hello! I'd like to know more about your grooming services.",
  pricing: "Hello! Could you please share your pricing for grooming services?",
  availability: "Hello! I'd like to check your availability for this week.",
} as const