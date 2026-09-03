import type {
  Business,
  Faq,
  Hero,
  Highlight,
  Loyalty,
  OpeningHours,
  PartialContent,
  Reviews,
  Service,
  ServiceType,
  SiteContent,
  Stat,
  TeamMember,
  Testimonial,
} from './types'

/**
 * Merges owner-supplied content over the committed defaults.
 *
 * Everything here is defensive on purpose: the remote source is a spreadsheet a
 * non-developer edits, so a blank cell, a stray row or a deleted tab must fall
 * back to the default rather than break the build or blank a section.
 */

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const str = (value: unknown, fallback = ''): string =>
  typeof value === 'string' ? value.trim() : typeof value === 'number' ? String(value) : fallback

const strList = (value: unknown): string[] =>
  Array.isArray(value) ? value.map((item) => str(item)).filter(Boolean) : []

const bool = (value: unknown, fallback: boolean): boolean =>
  typeof value === 'boolean' ? value : fallback

/** Keeps a section's default when the override is missing or empty. */
function preferList<T>(override: unknown, fallback: T[], map: (item: Record<string, unknown>) => T | null): T[] {
  if (!Array.isArray(override)) return fallback
  const mapped = override.filter(isRecord).map(map).filter((item): item is T => item !== null)
  return mapped.length > 0 ? mapped : fallback
}

function normalizeBusiness(override: unknown, fallback: Business): Business {
  if (!isRecord(override)) return fallback
  const pick = (key: keyof Business) => str(override[key], fallback[key])
  return {
    name: pick('name'),
    tagline: pick('tagline'),
    description: pick('description'),
    phone: pick('phone'),
    whatsapp: pick('whatsapp'),
    email: pick('email'),
    addressLine: pick('addressLine'),
    locality: pick('locality'),
    region: pick('region'),
    postalCode: pick('postalCode'),
    country: pick('country'),
    timezone: pick('timezone'),
    url: pick('url'),
    priceRange: pick('priceRange'),
    googleMapsUrl: pick('googleMapsUrl'),
    mapEmbedUrl: pick('mapEmbedUrl'),
    instagram: pick('instagram'),
    facebook: pick('facebook'),
    announcement: str(override.announcement, fallback.announcement),
  }
}

const TIME = /^([01]?\d|2[0-3]):[0-5]\d$/

function normalizeHours(override: unknown, fallback: OpeningHours[]): OpeningHours[] {
  return preferList<OpeningHours>(override, fallback, (row) => {
    const days = strList(row.days)
    if (days.length === 0) return null
    const closed = bool(row.closed, false)
    const opens = str(row.opens)
    const closes = str(row.closes)
    if (!closed && (!TIME.test(opens) || !TIME.test(closes))) return null
    return { days, opens, closes, closed }
  })
}

const SERVICE_TYPES: ServiceType[] = ['package', 'spa', 'addon']

function normalizeServices(override: unknown, fallback: Service[]): Service[] {
  return preferList<Service>(override, fallback, (row) => {
    const name = str(row.name)
    if (!name) return null
    const type = SERVICE_TYPES.includes(row.type as ServiceType) ? (row.type as ServiceType) : 'addon'
    const pricing = isRecord(row.pricing)
      ? {
          small: str(row.pricing.small) || undefined,
          medium: str(row.pricing.medium) || undefined,
          large: str(row.pricing.large) || undefined,
        }
      : undefined
    const hasPricing = pricing && (pricing.small || pricing.medium || pricing.large)
    return {
      type,
      name,
      summary: str(row.summary),
      includes: strList(row.includes),
      pricing: hasPricing ? pricing : undefined,
      price: str(row.price) || undefined,
      featured: bool(row.featured, false),
    }
  })
}

function normalizeTeam(override: unknown, fallback: TeamMember[]): TeamMember[] {
  // Unlike other sections an empty team is a legitimate state, so an explicit
  // empty array clears it rather than falling back.
  if (!Array.isArray(override)) return fallback
  return override
    .filter(isRecord)
    .map((row): TeamMember | null => {
      const name = str(row.name)
      if (!name) return null
      return {
        name,
        role: str(row.role),
        specialty: str(row.specialty) || undefined,
        experience: str(row.experience) || undefined,
        certifications: strList(row.certifications),
        photo: str(row.photo) || undefined,
      }
    })
    .filter((member): member is TeamMember => member !== null)
}

function normalizeFaqs(override: unknown, fallback: Faq[]): Faq[] {
  return preferList<Faq>(override, fallback, (row) => {
    const question = str(row.question)
    const answer = str(row.answer)
    if (!question || !answer) return null
    return { category: str(row.category, 'General') || 'General', question, answer }
  })
}

function normalizeTestimonials(override: unknown, fallback: Testimonial[]): Testimonial[] {
  if (!Array.isArray(override)) return fallback
  return override
    .filter(isRecord)
    .map((row): Testimonial | null => {
      const quote = str(row.quote)
      const name = str(row.name)
      if (!quote || !name) return null
      const parsed = Number(row.rating)
      const rating = Number.isFinite(parsed) ? Math.min(5, Math.max(1, Math.round(parsed))) : 5
      return {
        name,
        quote,
        rating,
        petName: str(row.petName) || undefined,
        petBreed: str(row.petBreed) || undefined,
        date: str(row.date) || undefined,
      }
    })
    .filter((item): item is Testimonial => item !== null)
}

function normalizeStats(override: unknown, fallback: Stat[]): Stat[] {
  return preferList<Stat>(override, fallback, (row) => {
    const value = str(row.value)
    const label = str(row.label)
    if (!value || !label) return null
    return { value, label }
  })
}

function normalizeHighlights(override: unknown, fallback: Highlight[]): Highlight[] {
  return preferList<Highlight>(override, fallback, (row) => {
    const title = str(row.title)
    if (!title) return null
    return { icon: str(row.icon, 'paw') || 'paw', title, description: str(row.description) }
  })
}

function normalizeHero(override: unknown, fallback: Hero): Hero {
  if (!isRecord(override)) return fallback
  const points = strList(override.points)
  return {
    headline: str(override.headline, fallback.headline),
    intro: str(override.intro, fallback.intro),
    image: str(override.image, fallback.image),
    imageAlt: str(override.imageAlt, fallback.imageAlt),
    points: points.length > 0 ? points : fallback.points,
  }
}

function normalizeLoyalty(override: unknown, fallback: Loyalty): Loyalty {
  if (!isRecord(override)) return fallback
  const pairs = (value: unknown, fb: { title: string; description: string }[]) =>
    preferList(value, fb, (row) => {
      const title = str(row.title)
      if (!title) return null
      return { title, description: str(row.description) }
    })
  return {
    enabled: bool(override.enabled, fallback.enabled),
    title: str(override.title, fallback.title),
    intro: str(override.intro, fallback.intro),
    benefits: pairs(override.benefits, fallback.benefits),
    steps: pairs(override.steps, fallback.steps),
  }
}

function normalizeReviews(override: unknown, fallback: Reviews): Reviews {
  if (!isRecord(override)) return fallback
  return {
    rating: str(override.rating, fallback.rating),
    count: str(override.count, fallback.count),
    url: str(override.url, fallback.url),
  }
}

export function mergeContent(defaults: SiteContent, override: PartialContent | null | undefined): SiteContent {
  if (!override || !isRecord(override)) return defaults
  return {
    business: normalizeBusiness(override.business, defaults.business),
    hero: normalizeHero(override.hero, defaults.hero),
    hours: normalizeHours(override.hours, defaults.hours),
    highlights: normalizeHighlights(override.highlights, defaults.highlights),
    stats: normalizeStats(override.stats, defaults.stats),
    services: normalizeServices(override.services, defaults.services),
    team: normalizeTeam(override.team, defaults.team),
    faqs: normalizeFaqs(override.faqs, defaults.faqs),
    testimonials: normalizeTestimonials(override.testimonials, defaults.testimonials),
    loyalty: normalizeLoyalty(override.loyalty, defaults.loyalty),
    reviews: normalizeReviews(override.reviews, defaults.reviews),
  }
}
