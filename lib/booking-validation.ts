import type { BookingSubmission } from './brevo'

/**
 * Server-side validation for the booking form.
 *
 * The browser checks are a convenience; these are the ones that count, because
 * anything can POST to /api/booking.
 */

export interface ValidationResult {
  valid: boolean
  errors: Record<string, string>
  submission?: BookingSubmission
}

const MAX = { name: 100, phone: 30, petBreed: 100, service: 120, notes: 2000, email: 254 } as const

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

const text = (value: unknown): string => (typeof value === 'string' ? value.trim() : '')

/** Today in the salon's timezone, as YYYY-MM-DD. */
export function todayInTimezone(timezone: string, now: Date = new Date()): string {
  try {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(now)
  } catch {
    return now.toISOString().split('T')[0]
  }
}

/** A year ahead is well past any real booking; beyond that it is a typo or a bot. */
function tooFarAhead(date: string, today: string): boolean {
  const limit = new Date(today)
  limit.setFullYear(limit.getFullYear() + 1)
  return new Date(date) > limit
}

export function validateBooking(
  input: unknown,
  options: { timezone?: string; now?: Date } = {}
): ValidationResult {
  const errors: Record<string, string> = {}

  if (typeof input !== 'object' || input === null) {
    return { valid: false, errors: { form: 'Please fill in the form and try again.' } }
  }

  const body = input as Record<string, unknown>

  const name = text(body.name)
  const phone = text(body.phone)
  const petBreed = text(body.petBreed)
  const preferredDate = text(body.preferredDate)
  const email = text(body.email)
  const service = text(body.service)
  const notes = text(body.notes)

  if (!name) errors.name = 'Please tell us your name.'
  else if (name.length > MAX.name) errors.name = 'That name is too long.'

  // Digits only after stripping formatting: 8 for a local number, more for
  // anything carrying a country code.
  const phoneDigits = phone.replace(/\D/g, '')
  if (!phone) errors.phone = 'Please give us a number we can reach you on.'
  else if (phone.length > MAX.phone || phoneDigits.length < 8 || phoneDigits.length > 15)
    errors.phone = 'That does not look like a phone number.'

  if (!petBreed) errors.petBreed = "Please tell us your pet's breed."
  else if (petBreed.length > MAX.petBreed) errors.petBreed = 'That is too long.'

  const today = todayInTimezone(options.timezone || 'Asia/Singapore', options.now)
  if (!preferredDate) errors.preferredDate = 'Please pick a date.'
  else if (!ISO_DATE.test(preferredDate) || Number.isNaN(Date.parse(preferredDate)))
    errors.preferredDate = 'Please pick a date.'
  else if (preferredDate < today) errors.preferredDate = 'Please pick a date in the future.'
  else if (tooFarAhead(preferredDate, today)) errors.preferredDate = 'Please pick a date within the next year.'

  if (email && (email.length > MAX.email || !EMAIL.test(email)))
    errors.email = 'Please check that email address.'

  if (service.length > MAX.service) errors.service = 'That is too long.'
  if (notes.length > MAX.notes) errors.notes = 'Please keep notes under 2000 characters.'

  if (Object.keys(errors).length > 0) return { valid: false, errors }

  return {
    valid: true,
    errors: {},
    submission: {
      name,
      phone,
      petBreed,
      preferredDate,
      email: email || undefined,
      service: service || undefined,
      notes: notes || undefined,
      // Consent only counts when the box was actually ticked.
      marketingConsent: body.marketingConsent === true && Boolean(email),
    },
  }
}

/**
 * Best-effort sliding-window rate limit.
 *
 * Held in module scope, so it is per warm serverless instance rather than
 * global — enough to blunt a script hammering one instance, and it is not the
 * only defence. The honeypot in the route catches the common form bots.
 */
const WINDOW_MS = 10 * 60 * 1000

/**
 * Deliberately loose. Invalid submissions count too, so a bot posting garbage
 * is capped — but Singapore has enough shared and carrier-NAT addresses that a
 * tight limit would eventually turn away a real customer.
 */
export const MAX_PER_WINDOW = 8

const hits = new Map<string, number[]>()

export function rateLimit(key: string, now: number = Date.now()): { allowed: boolean; retryAfter: number } {
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS)

  if (recent.length >= MAX_PER_WINDOW) {
    const retryAfter = Math.ceil((WINDOW_MS - (now - recent[0])) / 1000)
    hits.set(key, recent)
    return { allowed: false, retryAfter }
  }

  recent.push(now)
  hits.set(key, recent)

  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 500) {
    hits.forEach((times, existing) => {
      if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(existing)
    })
  }

  return { allowed: true, retryAfter: 0 }
}

/** Exposed so tests can start from a clean slate. */
export function resetRateLimit(): void {
  hits.clear()
}
