/**
 * Shape of every piece of copy, price and detail on the site.
 *
 * Nothing in here is hard-coded in a component: `content/site.json` holds the
 * committed defaults, and an optional remote source (Google Sheet or hosted
 * JSON) can override any of it without a code change. See CONTENT_GUIDE.md.
 */

export type ServiceType = 'package' | 'spa' | 'addon'

export interface Service {
  /** Which block of the services page this belongs to. */
  type: ServiceType
  name: string
  summary: string
  /** Bullet list of what the service includes. */
  includes: string[]
  /** Size-tiered pricing, used by `package` services. */
  pricing?: {
    small?: string
    medium?: string
    large?: string
  }
  /** Flat price, used by `spa` and `addon` services. */
  price?: string
  featured?: boolean
}

export interface TeamMember {
  name: string
  role: string
  specialty?: string
  experience?: string
  certifications: string[]
  /** Absolute or /public-relative image path. Omitted members show initials. */
  photo?: string
}

export interface Faq {
  category: string
  question: string
  answer: string
}

export interface Testimonial {
  name: string
  quote: string
  rating: number
  petName?: string
  petBreed?: string
  date?: string
}

export interface Stat {
  value: string
  label: string
}

export interface Highlight {
  /** Key into the icon set in components/ui/Icon.tsx. */
  icon: string
  title: string
  description: string
}

export interface OpeningHours {
  /** Day names this row covers, e.g. ["Monday", "Tuesday"]. */
  days: string[]
  /** 24-hour "HH:MM". Ignored when `closed`. */
  opens: string
  closes: string
  closed: boolean
}

export interface Business {
  name: string
  tagline: string
  description: string
  /** Display form, e.g. "+65 8668 9078". */
  phone: string
  /** Digits only or +65 form; normalised before use. */
  whatsapp: string
  email: string
  addressLine: string
  locality: string
  region: string
  postalCode: string
  country: string
  /** IANA timezone used for the "open now" indicator. */
  timezone: string
  url: string
  priceRange: string
  googleMapsUrl: string
  mapEmbedUrl: string
  instagram: string
  facebook: string
  /** Optional site-wide notice: holiday hours, fully booked, etc. */
  announcement: string
}

export interface Hero {
  headline: string
  intro: string
  /** Salon photo. Replace the stock default with a real one. */
  image: string
  imageAlt: string
  /** Short proof points shown under the headline. */
  points: string[]
}

export interface Loyalty {
  enabled: boolean
  title: string
  intro: string
  benefits: { title: string; description: string }[]
  steps: { title: string; description: string }[]
}

export interface Reviews {
  /** Average rating shown on the site; keep it matching Google. */
  rating: string
  count: string
  url: string
}

export interface SiteContent {
  business: Business
  hero: Hero
  hours: OpeningHours[]
  highlights: Highlight[]
  stats: Stat[]
  services: Service[]
  team: TeamMember[]
  faqs: Faq[]
  testimonials: Testimonial[]
  loyalty: Loyalty
  reviews: Reviews
}

/** A remote source may supply any subset of the content. */
export type PartialContent = {
  [K in keyof SiteContent]?: Partial<SiteContent[K]>
}
