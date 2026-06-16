import type { Metadata, Viewport } from 'next'
import { Fira_Code, Instrument_Serif, Inter } from 'next/font/google'
import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  display: 'swap',
  weight: ['400'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

const siteMetadataBase =
  process.env.NODE_ENV === 'production'
    ? 'https://alen983.github.io/genesisenv-Website'
    : 'http://localhost:3000'

/** Must match `basePath` in `next.config.js` (empty in dev). */
const SITE_BASE_PATH = process.env.NODE_ENV === 'production' ? '/genesisenv-Website' : ''

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadataBase),
  title: 'genesis-env - Configuration Discipline for Environment Variables',
  description: 'genesis-env is not a tool. It\'s a configuration discipline. Validate, manage, and enforce environment variable standards.',
  icons: {
    icon: [
      { url: `${SITE_BASE_PATH}/icon.svg`, type: 'image/svg+xml' },
      { url: `${SITE_BASE_PATH}/favicon.ico`, sizes: '48x48' },
    ],
  },
  openGraph: {
    title: 'genesis-env - Configuration Discipline',
    description: 'Validate, manage, and enforce environment variable standards.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} ${firaCode.variable} ${instrumentSerif.variable} bg-background text-foreground antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
