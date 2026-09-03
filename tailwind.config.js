/**
 * Design tokens for The Pawlour.
 *
 * The palette is taken from the salon's own logo: black ink on warm paper, with
 * a single muted clay accent. No gradients, no glows — the brand mark is a
 * letterpress stamp and the site is built to sit next to it.
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#1A1917', // headings, primary buttons, the logo itself
          soft: '#4A4741',    // body copy
          muted: '#7B776E',   // captions, labels
        },
        paper: {
          DEFAULT: '#FBFAF7', // page background
          shell: '#F2EFE8',   // alternating sections
          card: '#FFFFFF',
        },
        line: {
          DEFAULT: '#E3DFD6', // hairline rules and card borders
          strong: '#CFC9BC',
        },
        clay: {
          DEFAULT: '#A4553A', // the one accent: links, active states, prices
          soft: '#F0E4DE',
        },
        whatsapp: '#128C4A', // brand green, only on WhatsApp actions
      },
      fontFamily: {
        // Barlow echoes the wordmark; Inter carries everything else.
        display: ['var(--font-barlow)', 'Barlow', 'Helvetica Neue', 'Arial', 'sans-serif'],
        sans: ['var(--font-inter)', 'Inter', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      letterSpacing: {
        wordmark: '0.18em',
      },
      maxWidth: {
        prose: '68ch',
      },
      borderRadius: {
        DEFAULT: '2px',
        card: '3px',
      },
      boxShadow: {
        // One shadow, used sparingly for overlays only.
        raised: '0 1px 2px rgba(26, 25, 23, 0.06), 0 8px 24px -12px rgba(26, 25, 23, 0.18)',
      },
      keyframes: {
        rise: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        rise: 'rise 0.4s ease-out both',
      },
    },
  },
  plugins: [],
}
