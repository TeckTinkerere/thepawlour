import type { Metadata } from 'next'
import { Inter, Playfair_Display, Barlow } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import MobileFooter from '@/components/layout/MobileFooter'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

const barlow = Barlow({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-barlow',
})

export const metadata: Metadata = {
  title: 'The Pawlour - Premium Pet Grooming in Hougang, Singapore',
  description: 'Cage-free, stress-free pet grooming services in Hougang. SKC certified groomers using premium products. Book your appointment via WhatsApp.',
  keywords: 'Pet Grooming Hougang, Cage-free dog grooming Singapore, SKC certified groomer, premium pet spa',
  authors: [{ name: 'The Pawlour' }],
  robots: 'index, follow',
  icons: {
    icon: '/icons/logo.png',
    shortcut: '/icons/logo.png',
    apple: '/icons/logo.png',
  },
  openGraph: {
    title: 'The Pawlour - Premium Pet Grooming in Hougang',
    description: 'Cage-free, stress-free pet grooming services with SKC certified groomers',
    type: 'website',
    locale: 'en_SG',
    siteName: 'The Pawlour',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Pawlour - Premium Pet Grooming in Hougang',
    description: 'Cage-free, stress-free pet grooming services with SKC certified groomers',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${barlow.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "The Pawlour",
              "description": "Premium pet grooming salon offering cage-free, stress-free grooming services",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Hougang",
                "addressRegion": "Singapore",
                "addressCountry": "SG"
              },
              "telephone": "+65-XXXX-XXXX",
              "url": "https://thepawlour.com",
              "priceRange": "$$",
              "servesCuisine": "Pet Grooming Services",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Pet Grooming Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Full Grooming Service"
                    }
                  },
                  {
                    "@type": "Offer", 
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Basic Grooming Service"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service", 
                      "name": "Spa Treatments"
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body className="bg-warm-cream text-gray-800">
        <Navbar />
        <main id="main-content">
          {children}
        </main>
        <MobileFooter />
      </body>
    </html>
  )
}