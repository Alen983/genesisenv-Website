import type { Metadata, Viewport } from 'next'
import { Inter, Fira_Code } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://alen983.github.io'),
  title: 'genesis-env - Configuration Discipline for Environment Variables',
  description: 'genesis-env is not a tool. It\'s a configuration discipline. Validate, manage, and enforce environment variable standards.',
  openGraph: {
    title: 'genesis-env - Configuration Discipline',
    description: 'Validate, manage, and enforce environment variable standards.',
    images: ['/genesisenv-Website/og-image.png'],
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
        className={`${inter.variable} ${firaCode.variable} bg-background text-foreground antialiased`}
      >
        <ThemeProvider>
          <Navbar />
          <main className="min-w-0 w-full">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
