import { isFalsy, parseSheet, splitList } from './csv'
import type { PartialContent } from './types'

/**
 * Optional remote content sources.
 *
 * The site ships fully populated from content/site.json, so both of these are
 * opt-in. When one is configured its values are layered over the committed
 * defaults, which is what lets the salon change prices, hours or the team
 * without touching the codebase.
 *
 *   CONTENT_SHEET_ID  - a Google Sheet published to the web (see CONTENT_GUIDE.md)
 *   CONTENT_JSON_URL  - any URL returning the same shape as content/site.json
 *   CONTENT_REVALIDATE_SECONDS - how often a live page re-checks (default 300)
 */

export const TABS = ['Business', 'Hours', 'Highlights', 'Stats', 'Services', 'Team', 'FAQs', 'Testimonials'] as const
export type Tab = (typeof TABS)[number]

export function revalidateSeconds(): number {
  const parsed = Number(process.env.CONTENT_REVALIDATE_SECONDS)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 300
}

async function fetchText(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      next: { revalidate: revalidateSeconds() },
      signal: AbortSignal.timeout(10_000),
    })
    if (!response.ok) {
      console.warn(`[content] ${response.status} from ${url}`)
      return null
    }
    return await response.text()
  } catch (error) {
    console.warn(`[content] could not read ${url}:`, error instanceof Error ? error.message : error)
    return null
  }
}

function sheetUrl(sheetId: string, tab: Tab): string {
  return `https://docs.google.com/spreadsheets/d/${encodeURIComponent(sheetId)}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tab)}`
}

/** Rows an owner has marked hidden stay out of the site without being deleted. */
const visible = (row: Record<string, string>) => !isFalsy(row.visible ?? row.show ?? row.published)

/** Business tab is key/value, so owners can add a row without a schema change. */
const BUSINESS_KEYS: Record<string, string> = {
  name: 'name',
  tagline: 'tagline',
  description: 'description',
  phone: 'phone',
  whatsapp: 'whatsapp',
  email: 'email',
  address: 'addressLine',
  addressline: 'addressLine',
  locality: 'locality',
  region: 'region',
  postalcode: 'postalCode',
  country: 'country',
  timezone: 'timezone',
  url: 'url',
  website: 'url',
  pricerange: 'priceRange',
  googlemapsurl: 'googleMapsUrl',
  mapembedurl: 'mapEmbedUrl',
  instagram: 'instagram',
  facebook: 'facebook',
  announcement: 'announcement',
}

const REVIEW_KEYS: Record<string, string> = {
  reviewrating: 'rating',
  reviewcount: 'count',
  reviewsurl: 'url',
}

const HERO_KEYS: Record<string, string> = {
  heroheadline: 'headline',
  herointro: 'intro',
  heroimage: 'image',
  heroimagealt: 'imageAlt',
  heropoints: 'points',
}

function readBusinessTab(csv: string): Pick<PartialContent, 'business' | 'reviews' | 'hero'> {
  const business: Record<string, string> = {}
  const reviews: Record<string, string> = {}
  const hero: Record<string, unknown> = {}

  for (const row of parseSheet(csv)) {
    const key = (row.key ?? row.field ?? row.setting ?? '').toLowerCase().replace(/[\s_-]+/g, '')
    const value = row.value ?? ''
    if (!key || value === '') continue
    if (BUSINESS_KEYS[key]) business[BUSINESS_KEYS[key]] = value
    else if (REVIEW_KEYS[key]) reviews[REVIEW_KEYS[key]] = value
    else if (HERO_KEYS[key]) {
      const field = HERO_KEYS[key]
      hero[field] = field === 'points' ? splitList(value) : value
    }
  }

  return {
    business: Object.keys(business).length ? (business as PartialContent['business']) : undefined,
    reviews: Object.keys(reviews).length ? (reviews as PartialContent['reviews']) : undefined,
    hero: Object.keys(hero).length ? (hero as PartialContent['hero']) : undefined,
  }
}

/** Exported for tests: turns one tab's CSV into a slice of content. */
export function readTab(tab: Tab, csv: string): PartialContent {
  const rows = parseSheet(csv).filter(visible)

  switch (tab) {
    case 'Business':
      return readBusinessTab(csv)

    case 'Hours':
      return {
        hours: rows.map((row) => {
          const opens = row.opens || row.open || ''
          const closes = row.closes || row.close || ''
          const markedClosed = ['yes', 'true', 'closed', '1'].includes((row.closed || '').toLowerCase())
          return {
            days: splitList(row.days || row.day),
            opens,
            closes,
            closed: markedClosed || !opens || !closes,
          }
        }) as PartialContent['hours'],
      }

    case 'Highlights':
      return {
        highlights: rows.map((row) => ({
          icon: row.icon || 'paw',
          title: row.title || '',
          description: row.description || '',
        })) as PartialContent['highlights'],
      }

    case 'Stats':
      return { stats: rows.map((row) => ({ value: row.value || '', label: row.label || '' })) as PartialContent['stats'] }

    case 'Services':
      return {
        services: rows.map((row) => ({
          type: (row.type || 'addon').toLowerCase(),
          name: row.name || '',
          summary: row.summary || row.description || '',
          includes: splitList(row.includes),
          pricing: { small: row.small || undefined, medium: row.medium || undefined, large: row.large || undefined },
          price: row.price || undefined,
          featured: ['yes', 'true', '1'].includes((row.featured || '').toLowerCase()),
        })) as PartialContent['services'],
      }

    case 'Team':
      return {
        team: rows.map((row) => ({
          name: row.name || '',
          role: row.role || '',
          specialty: row.specialty || row.specialisation || row.specialization || '',
          experience: row.experience || '',
          certifications: splitList(row.certifications),
          photo: row.photo || row.image || '',
        })) as PartialContent['team'],
      }

    case 'FAQs':
      return {
        faqs: rows.map((row) => ({
          category: row.category || 'General',
          question: row.question || '',
          answer: row.answer || '',
        })) as PartialContent['faqs'],
      }

    case 'Testimonials':
      return {
        testimonials: rows.map((row) => ({
          name: row.name || '',
          quote: row.quote || row.review || '',
          rating: Number(row.rating || 5),
          petName: row.pet || row.petname || '',
          petBreed: row.breed || row.petbreed || '',
          date: row.date || '',
        })) as PartialContent['testimonials'],
      }
  }
}

async function fromSheet(sheetId: string): Promise<PartialContent> {
  // Tabs are fetched together and merged independently, so one broken or
  // missing tab only costs that section its override.
  const results = await Promise.all(
    TABS.map(async (tab) => {
      const csv = await fetchText(sheetUrl(sheetId, tab))
      if (!csv || csv.trimStart().startsWith('<')) return {}
      try {
        return readTab(tab, csv)
      } catch (error) {
        console.warn(`[content] could not read the "${tab}" tab:`, error)
        return {}
      }
    })
  )

  return results.reduce<PartialContent>((merged, part) => ({ ...merged, ...part }), {})
}

async function fromJsonUrl(url: string): Promise<PartialContent> {
  const text = await fetchText(url)
  if (!text) return {}
  try {
    const parsed = JSON.parse(text)
    return typeof parsed === 'object' && parsed !== null ? (parsed as PartialContent) : {}
  } catch (error) {
    console.warn('[content] remote JSON was not valid JSON:', error)
    return {}
  }
}

/** Returns whatever the owner has published, or `null` when nothing is configured. */
export async function fetchRemoteContent(): Promise<PartialContent | null> {
  const sheetId = process.env.CONTENT_SHEET_ID?.trim()
  const jsonUrl = process.env.CONTENT_JSON_URL?.trim()

  if (jsonUrl) return fromJsonUrl(jsonUrl)
  if (sheetId) return fromSheet(sheetId)
  return null
}
