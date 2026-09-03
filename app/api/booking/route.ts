import { NextResponse } from 'next/server'
import { rateLimit, validateBooking } from '@/lib/booking-validation'
import { isBrevoConfigured, sendBookingRequest } from '@/lib/brevo'
import { getSiteContent } from '@/lib/content'

/** The form posts here; nothing about it can be prerendered. */
export const dynamic = 'force-dynamic'

/**
 * Receives a booking request and delivers it through Brevo.
 *
 * Responses are deliberately shaped so the form can degrade: `not-configured`
 * tells the browser to fall back to the WhatsApp handoff rather than show an
 * error the visitor can do nothing about.
 */
export async function POST(request: Request) {
  if (!isBrevoConfigured()) {
    return NextResponse.json({ ok: false, reason: 'not-configured' }, { status: 503 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, reason: 'invalid' }, { status: 400 })
  }

  // Honeypot: a field hidden from people and irresistible to form bots. Answer
  // as though it worked, so the bot has nothing to tune against.
  const honeypot = (body as Record<string, unknown>)?.website
  if (typeof honeypot === 'string' && honeypot.trim() !== '') {
    return NextResponse.json({ ok: true, contactStored: false })
  }

  const ip =
    request.headers.get('x-nf-client-connection-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    'unknown'

  const limit = rateLimit(ip)
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, reason: 'rate-limited' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
    )
  }

  const { business } = await getSiteContent()
  const { valid, errors, submission } = validateBooking(body, { timezone: business.timezone })

  if (!valid || !submission) {
    return NextResponse.json({ ok: false, reason: 'invalid', errors }, { status: 422 })
  }

  const result = await sendBookingRequest(submission)

  if (!result.ok) {
    const status = result.reason === 'not-configured' ? 503 : 502
    return NextResponse.json({ ok: false, reason: result.reason }, { status })
  }

  return NextResponse.json({ ok: true, contactStored: result.contactStored })
}
