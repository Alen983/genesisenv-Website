import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

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
    <html lang="en" className={inter.variable}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
