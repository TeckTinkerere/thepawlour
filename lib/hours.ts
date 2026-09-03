import type { OpeningHours } from '@/lib/content/types'

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const

/** "14:30" -> 870 minutes past midnight. */
function toMinutes(time: string): number | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(time.trim())
  if (!match) return null
  return Number(match[1]) * 60 + Number(match[2])
}

/** "14:30" -> "2.30pm", the way an SG shopfront writes it. */
export function formatTime(time: string): string {
  const minutes = toMinutes(time)
  if (minutes === null) return time
  const hour24 = Math.floor(minutes / 60)
  const minute = minutes % 60
  const suffix = hour24 < 12 ? 'am' : 'pm'
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12
  return minute === 0 ? `${hour12}${suffix}` : `${hour12}.${String(minute).padStart(2, '0')}${suffix}`
}

/** "Monday"…"Friday" -> "Mon – Fri"; non-consecutive days stay listed. */
export function formatDays(days: string[]): string {
  if (days.length === 0) return ''
  if (days.length === 1) return days[0]

  const indexes = days.map((day) => DAY_NAMES.findIndex((name) => name.toLowerCase() === day.toLowerCase()))
  const consecutive =
    indexes.every((index) => index >= 0) && indexes.every((index, i) => i === 0 || index === indexes[i - 1] + 1)

  const short = (day: string) => day.slice(0, 3)
  return consecutive ? `${short(days[0])} – ${short(days[days.length - 1])}` : days.map(short).join(', ')
}

export function formatHoursRow(row: OpeningHours): string {
  return row.closed ? 'Closed' : `${formatTime(row.opens)} – ${formatTime(row.closes)}`
}

/**
 * Parts of "now" in the salon's own timezone, so a visitor in another country
 * still sees whether the Hougang shop is open.
 */
function nowInTimezone(timezone: string, now: Date) {
  try {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: timezone,
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).formatToParts(now)
    const get = (type: string) => parts.find((part) => part.type === type)?.value ?? ''
    const hour = Number(get('hour'))
    const minute = Number(get('minute'))
    return { weekday: get('weekday'), minutes: (Number.isFinite(hour) ? hour : 0) * 60 + (Number.isFinite(minute) ? minute : 0) }
  } catch {
    return { weekday: DAY_NAMES[now.getDay()], minutes: now.getHours() * 60 + now.getMinutes() }
  }
}

export interface OpenStatus {
  isOpen: boolean
  /** Short line for the badge, e.g. "Open until 6pm" or "Closed · opens Mon 10am". */
  label: string
}

/**
 * Works out whether the salon is open right now.
 * Replaces the hard-coded "OPEN" badge, which was wrong outside opening hours.
 */
export function getOpenStatus(hours: OpeningHours[], timezone: string, now: Date = new Date()): OpenStatus {
  const { weekday, minutes } = nowInTimezone(timezone, now)

  const rowFor = (day: string) =>
    hours.find((row) => row.days.some((rowDay) => rowDay.toLowerCase() === day.toLowerCase()))

  const today = rowFor(weekday)
  if (today && !today.closed) {
    const opens = toMinutes(today.opens)
    const closes = toMinutes(today.closes)
    if (opens !== null && closes !== null) {
      if (minutes >= opens && minutes < closes) {
        return { isOpen: true, label: `Open until ${formatTime(today.closes)}` }
      }
      if (minutes < opens) {
        return { isOpen: false, label: `Closed · opens ${formatTime(today.opens)}` }
      }
    }
  }

  // Look ahead for the next day that has hours.
  const todayIndex = DAY_NAMES.findIndex((name) => name.toLowerCase() === weekday.toLowerCase())
  for (let offset = 1; offset <= 7; offset += 1) {
    const day = DAY_NAMES[(Math.max(todayIndex, 0) + offset) % 7]
    const row = rowFor(day)
    if (row && !row.closed) {
      const prefix = offset === 1 ? 'tomorrow' : day.slice(0, 3)
      return { isOpen: false, label: `Closed · opens ${prefix} ${formatTime(row.opens)}` }
    }
  }

  return { isOpen: false, label: 'Closed' }
}
