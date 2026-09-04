/**
 * These exercise server-side code, so they run in the node environment where
 * fetch and Response are the real globals rather than jsdom's.
 *
 * @jest-environment node
 */
import {
  MAX_PER_WINDOW,
  rateLimit,
  resetRateLimit,
  todayInTimezone,
  validateBooking,
} from '@/lib/booking-validation'
import { buildEmailContent, getBrevoConfig, isBrevoConfigured, sendBookingRequest } from '@/lib/brevo'

/** A month out, so the fixture does not expire or trip the one-year cap. */
const inDays = (days: number) => new Date(Date.now() + days * 86_400_000).toISOString().split('T')[0]

const VALID = {
  name: 'Jane Tan',
  phone: '8123 4567',
  petBreed: 'Shih Tzu',
  preferredDate: inDays(30),
}

describe('Booking validation', () => {
  it('accepts a complete request and normalises the optional fields', () => {
    const { valid, submission } = validateBooking({ ...VALID, service: '', notes: '  ' })

    expect(valid).toBe(true)
    expect(submission).toMatchObject({ name: 'Jane Tan', phone: '8123 4567', petBreed: 'Shih Tzu' })
    expect(submission?.service).toBeUndefined()
    expect(submission?.notes).toBeUndefined()
  })

  it('requires the fields the salon cannot work without', () => {
    const { valid, errors } = validateBooking({})

    expect(valid).toBe(false)
    expect(Object.keys(errors).sort()).toEqual(['name', 'petBreed', 'phone', 'preferredDate'])
  })

  it('rejects a phone number that is not one', () => {
    expect(validateBooking({ ...VALID, phone: '12' }).errors.phone).toBeDefined()
    expect(validateBooking({ ...VALID, phone: 'call me' }).errors.phone).toBeDefined()
    // Formatting and country codes are fine.
    expect(validateBooking({ ...VALID, phone: '+65 8123 4567' }).valid).toBe(true)
    expect(validateBooking({ ...VALID, phone: '(65) 8123-4567' }).valid).toBe(true)
  })

  it('judges "in the past" in the salon timezone, not the server\'s', () => {
    // 16:30 UTC is already the next day in Singapore, so a booking for the
    // UTC date is in the past for the salon.
    const now = new Date('2030-01-15T16:30:00Z')

    expect(todayInTimezone('Asia/Singapore', now)).toBe('2030-01-16')
    expect(validateBooking({ ...VALID, preferredDate: '2030-01-15' }, { now }).errors.preferredDate).toBeDefined()
    expect(validateBooking({ ...VALID, preferredDate: '2030-01-16' }, { now }).valid).toBe(true)
  })

  it('rejects dates that are typos rather than bookings', () => {
    expect(validateBooking({ ...VALID, preferredDate: inDays(400) }).errors.preferredDate).toBeDefined()
    expect(validateBooking({ ...VALID, preferredDate: 'next tuesday' }).errors.preferredDate).toBeDefined()
    expect(validateBooking({ ...VALID, preferredDate: inDays(-1) }).errors.preferredDate).toBeDefined()
  })

  it('checks an email only when one is given', () => {
    expect(validateBooking(VALID).valid).toBe(true)
    expect(validateBooking({ ...VALID, email: 'not-an-email' }).errors.email).toBeDefined()
    expect(validateBooking({ ...VALID, email: 'jane@example.com' }).valid).toBe(true)
  })

  it('caps field lengths so the form cannot be used to send an essay', () => {
    expect(validateBooking({ ...VALID, notes: 'x'.repeat(2001) }).errors.notes).toBeDefined()
    expect(validateBooking({ ...VALID, name: 'x'.repeat(101) }).errors.name).toBeDefined()
  })

  it('only records marketing consent when it was given with an email', () => {
    // A booking is not permission to market to someone.
    expect(validateBooking({ ...VALID, marketingConsent: true }).submission?.marketingConsent).toBe(false)
    expect(
      validateBooking({ ...VALID, email: 'jane@example.com', marketingConsent: true }).submission
        ?.marketingConsent
    ).toBe(true)
    expect(
      validateBooking({ ...VALID, email: 'jane@example.com', marketingConsent: 'yes' }).submission
        ?.marketingConsent
    ).toBe(false)
  })

  it('refuses anything that is not an object', () => {
    for (const input of [null, undefined, 'string', 42, []]) {
      expect(validateBooking(input).valid).toBe(false)
    }
  })
})

describe('Rate limiting', () => {
  beforeEach(resetRateLimit)

  it('allows a handful of requests then holds the rest', () => {
    const now = Date.now()
    for (let i = 0; i < MAX_PER_WINDOW; i += 1) expect(rateLimit('1.2.3.4', now).allowed).toBe(true)

    const blocked = rateLimit('1.2.3.4', now)
    expect(blocked.allowed).toBe(false)
    expect(blocked.retryAfter).toBeGreaterThan(0)
  })

  it('counts each address separately', () => {
    const now = Date.now()
    for (let i = 0; i < MAX_PER_WINDOW; i += 1) rateLimit('1.2.3.4', now)
    expect(rateLimit('5.6.7.8', now).allowed).toBe(true)
  })

  it('lets the window slide', () => {
    const now = Date.now()
    for (let i = 0; i < MAX_PER_WINDOW; i += 1) rateLimit('1.2.3.4', now)
    expect(rateLimit('1.2.3.4', now).allowed).toBe(false)
    expect(rateLimit('1.2.3.4', now + 11 * 60 * 1000).allowed).toBe(true)
  })
})

describe('Brevo', () => {
  const ENV = process.env

  beforeEach(() => {
    process.env = { ...ENV }
    delete process.env.BREVO_API_KEY
    delete process.env.BREVO_SENDER_EMAIL
    jest.restoreAllMocks()
  })

  afterAll(() => {
    process.env = ENV
  })

  const configure = () => {
    process.env.BREVO_API_KEY = 'test-key'
    process.env.BREVO_SENDER_EMAIL = 'site@thepawlour.com'
    process.env.BREVO_TO_EMAIL = 'hello@thepawlour.com'
  }

  it('reports itself unconfigured until both key and sender are set', () => {
    expect(isBrevoConfigured()).toBe(false)

    process.env.BREVO_API_KEY = 'test-key'
    expect(isBrevoConfigured()).toBe(false)

    process.env.BREVO_SENDER_EMAIL = 'site@thepawlour.com'
    expect(isBrevoConfigured()).toBe(true)
  })

  it('delivers to the sender when no recipient is configured', () => {
    process.env.BREVO_API_KEY = 'test-key'
    process.env.BREVO_SENDER_EMAIL = 'site@thepawlour.com'
    expect(getBrevoConfig()?.toEmail).toBe('site@thepawlour.com')
  })

  it('ignores a list id that is not a positive integer', () => {
    configure()
    for (const value of ['abc', '0', '-3', '']) {
      process.env.BREVO_LIST_ID = value
      expect(getBrevoConfig()?.listId).toBeUndefined()
    }
    process.env.BREVO_LIST_ID = '7'
    expect(getBrevoConfig()?.listId).toBe(7)
  })

  it('escapes customer input in the HTML email', () => {
    const { htmlContent, textContent, subject } = buildEmailContent({
      ...VALID,
      name: '<script>alert(1)</script>',
      notes: 'Line one\nLine two & "quoted"',
    })

    expect(htmlContent).not.toContain('<script>')
    expect(htmlContent).toContain('&lt;script&gt;')
    expect(htmlContent).toContain('Line one<br>Line two &amp; &quot;quoted&quot;')
    // The plain-text part is not HTML, so it stays readable.
    expect(textContent).toContain('Line one\nLine two & "quoted"')
    expect(subject).toContain('Shih Tzu')
  })

  it('does not call Brevo at all when unconfigured', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch')
    await expect(sendBookingRequest(VALID)).resolves.toEqual({ ok: false, reason: 'not-configured' })
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('sends the email with the customer as reply-to', async () => {
    configure()
    const fetchSpy = jest
      .spyOn(global, 'fetch')
      .mockResolvedValue(new Response('{}', { status: 201 }))

    const result = await sendBookingRequest({ ...VALID, email: 'jane@example.com' })

    expect(result).toEqual({ ok: true, contactStored: false })
    const [url, init] = fetchSpy.mock.calls[0]
    expect(url).toBe('https://api.brevo.com/v3/smtp/email')
    expect((init?.headers as Record<string, string>)['api-key']).toBe('test-key')

    const body = JSON.parse(init?.body as string)
    expect(body.to).toEqual([{ email: 'hello@thepawlour.com', name: 'The Pawlour' }])
    expect(body.replyTo).toEqual({ email: 'jane@example.com', name: 'Jane Tan' })
  })

  it('omits reply-to when no email was given', async () => {
    configure()
    const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue(new Response('{}', { status: 201 }))

    await sendBookingRequest(VALID)

    expect(JSON.parse(fetchSpy.mock.calls[0][1]?.body as string).replyTo).toBeUndefined()
  })

  it('stores a contact only with consent, an email and a list', async () => {
    configure()
    process.env.BREVO_LIST_ID = '7'
    const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue(new Response('{}', { status: 201 }))

    // No consent: one call, the email only.
    await sendBookingRequest({ ...VALID, email: 'jane@example.com' })
    expect(fetchSpy).toHaveBeenCalledTimes(1)

    fetchSpy.mockClear()
    const result = await sendBookingRequest({
      ...VALID,
      email: 'jane@example.com',
      marketingConsent: true,
    })

    expect(result).toEqual({ ok: true, contactStored: true })
    expect(fetchSpy).toHaveBeenCalledTimes(2)
    expect(fetchSpy.mock.calls[1][0]).toBe('https://api.brevo.com/v3/contacts')
    expect(JSON.parse(fetchSpy.mock.calls[1][1]?.body as string)).toMatchObject({
      email: 'jane@example.com',
      listIds: [7],
      updateEnabled: true,
    })
  })

  it('still reports success when only the contact write fails', async () => {
    configure()
    process.env.BREVO_LIST_ID = '7'
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce(new Response('{}', { status: 201 }))
      .mockResolvedValueOnce(new Response('{"code":"duplicate_parameter"}', { status: 400 }))

    // The booking reached the salon; the customer should not see an error.
    await expect(
      sendBookingRequest({ ...VALID, email: 'jane@example.com', marketingConsent: true })
    ).resolves.toEqual({ ok: true, contactStored: false })
  })

  it('reports a rejection and an outage differently', async () => {
    configure()
    jest.spyOn(console, 'error').mockImplementation(() => {})

    jest
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce(new Response('{"code":"unauthorized"}', { status: 401 }))
    await expect(sendBookingRequest(VALID)).resolves.toEqual({
      ok: false,
      reason: 'rejected',
      detail: 'unauthorized',
    })

    jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('network down'))
    await expect(sendBookingRequest(VALID)).resolves.toEqual({ ok: false, reason: 'unreachable' })
  })

  it('never puts the API key or customer details in a log line', async () => {
    configure()
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.spyOn(global, 'fetch').mockResolvedValue(new Response('{"code":"bad_request"}', { status: 400 }))

    await sendBookingRequest({ ...VALID, email: 'jane@example.com' })

    const logged = errorSpy.mock.calls.flat().join(' ')
    expect(logged).not.toContain('test-key')
    expect(logged).not.toContain('jane@example.com')
    expect(logged).not.toContain('Jane Tan')
  })
})
