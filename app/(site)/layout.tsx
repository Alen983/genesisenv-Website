import type { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

/** Marketing + app pages that share the main site chrome (not documentation). */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-w-0 w-full">{children}</main>
      <Footer />
    </>
  )
}
