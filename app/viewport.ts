import type { Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // maximumScale / userScalable were removed: blocking pinch-zoom fails
  // WCAG 1.4.4 and is a real problem for anyone reading prices on a phone.
  themeColor: '#FBFAF7',
}
