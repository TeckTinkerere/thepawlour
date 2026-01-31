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
 * Formats phone number for WhatsApp URL
 * Ensures Singapore country code (65) is included
 */
export function formatPhoneNumber(phone: string): string {
  // Remove any non-digit characters
  const cleaned = phone.replace(/\D/g, '')
  
  // Ensure it starts with Singapore country code (65)
  if (cleaned.startsWith('65')) {
    return cleaned
  } else if (cleaned.startsWith('6')) {
    return `65${cleaned.substring(1)}`
  } else {
    return `65${cleaned}`
  }
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