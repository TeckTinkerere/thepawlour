# The Pawlour

Website for The Pawlour, a cage-free pet grooming salon in Hougang, Singapore.
Next.js App Router, Tailwind, deployed on Netlify.

## Editing the site content

Prices, opening hours, the team, FAQs and the banner at the top of the page all
come from `content/site.json`, and can be driven live from a Google Sheet the
salon owns. **See [CONTENT_GUIDE.md](CONTENT_GUIDE.md)** — that is the document
to hand to whoever runs the business.

Nothing in the components hard-codes copy or prices.

Booking requests from the contact form are emailed to the salon through Brevo —
see [BREVO_SETUP.md](BREVO_SETUP.md). Unconfigured, the form falls back to
handing off to WhatsApp.

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # jest + fast-check
npm run build    # production build
```

## How content loads

```
content/site.json          committed defaults — always present, always the fallback
        ↓
lib/content/remote.ts      optional Google Sheet or hosted JSON (env-configured)
        ↓
lib/content/normalize.ts   validates and merges; bad data falls back per section
        ↓
getSiteContent()           what every page and section reads
```

Pages are statically rendered and revalidate every 5 minutes, so a sheet edit
reaches the live site without a rebuild. With no remote source configured the
site is entirely static.

Environment variables are listed in `.env.example` and explained in the content
guide.

## Structure

| Path | What lives there |
| --- | --- |
| `app/` | Routes, metadata, sitemap and robots |
| `components/sections/` | Page sections; each takes `content` and renders nothing it has no data for |
| `components/ui/` | Design primitives — `Section`, `Button`, `Icon`, `Figure` |
| `app/api/booking/` | Receives the booking form and delivers it through Brevo |
| `lib/content/` | The content pipeline |
| `lib/brevo.ts` | Brevo transactional email and contact storage |
| `lib/booking-validation.ts` | Server-side validation, rate limiting |
| `lib/hours.ts` | Opening-hours formatting and the live open/closed state |
| `lib/schema.tsx` | Structured data, generated from content |
| `content/site.json` | Every word, price and detail on the site |

## Design

The palette and type come from the salon's own logo: black ink on warm paper,
Barlow for display, Inter for text, one muted clay accent. No gradients, no
emoji, no decorative animation — hairline rules and whitespace do the
separating. Tokens live in `tailwind.config.js`.
