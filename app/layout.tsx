import type { Metadata } from 'next'
import { Inter, Barlow } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MobileFooter from '@/components/layout/MobileFooter'
import { getSiteContent } from '@/lib/content'
import { JsonLd, localBusinessSchema } from '@/lib/schema'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

// Barlow carries the wordmark and every heading; Playfair Display was dropped
// because a high-contrast serif reads nothing like the letterpress logo.
const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-barlow',
  display: 'swap',
})

/**
 * How often a live page re-reads the content source, in seconds. Must be a
 * literal for Next to pick it up; CONTENT_REVALIDATE_SECONDS tunes the
 * underlying fetches.
 */
export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  const { business } = await getSiteContent()

  return {
    metadataBase: new URL(business.url),
    title: {
      default: `${business.name} — Cage-free pet grooming in ${business.locality}, Singapore`,
      template: `%s — ${business.name}`,
    },
    description: business.description,
    keywords: [
      'pet grooming Hougang',
      'cage-free dog grooming Singapore',
      'SKC certified groomer',
      'cat grooming Singapore',
      'pet spa Hougang',
    ],
    alternates: { canonical: '/' },
    icons: { icon: '/icons/logo.png', shortcut: '/icons/logo.png', apple: '/icons/logo.png' },
    openGraph: {
      title: `${business.name} — Cage-free pet grooming in ${business.locality}`,
      description: business.description,
      type: 'website',
      locale: 'en_SG',
      siteName: business.name,
      url: business.url,
      images: [{ url: '/icons/logo.png', width: 545, height: 545, alt: business.name }],
    },
    twitter: {
      card: 'summary',
      title: `${business.name} — Cage-free pet grooming in ${business.locality}`,
      description: business.description,
    },
    robots: { index: true, follow: true },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const content = await getSiteContent()

  return (
    <html lang="en-SG" className={`${inter.variable} ${barlow.variable}`}>
      <body>
        <JsonLd data={localBusinessSchema(content)} />
        <Navbar business={content.business} announcement={content.business.announcement} />
        {/* Bottom padding keeps the sticky mobile booking bar off the last section. */}
        <main id="main-content" className="pb-24 md:pb-0">
          {children}
        </main>
        <Footer content={content} />
        <MobileFooter business={content.business} />
      </body>
    </html>
  )
}
