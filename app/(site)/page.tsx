'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { Github } from 'lucide-react'
import { GITHUB_REPO_URL } from '@/lib/site'
import BrandName from '@/components/BrandName'
import MuseumHero from '@/components/MuseumHero'
import HowItWorksTimeline from '@/components/HowItWorksTimeline'
import EnvShowcase from '@/components/EnvShowcase'
import DemoSection from '@/components/DemoSection'
import ScrollProgress from '@/components/ScrollProgress'

function SectionSeparator() {
  return (
    <div
      className="h-px w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent"
      aria-hidden
    />
  )
}

function FadeInSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <MuseumHero />

      <SectionSeparator />

      <HowItWorksTimeline />

      <SectionSeparator />

      {/* Philosophy Section */}
      <FadeInSection>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              <BrandName className="text-3xl md:text-4xl" /> is not a tool.
            </h2>
            <p className="text-2xl md:text-3xl text-accent font-semibold mb-8">
              It&apos;s a configuration discipline.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              <BrandName className="text-lg" /> keeps your environment variables aligned with the committed template so
              drift and missing keys are less likely to ship. It&apos;s the difference between chaos and control.
            </p>
          </div>
        </section>
      </FadeInSection>

      <SectionSeparator />

      <EnvShowcase />

      <SectionSeparator />

      <DemoSection />

      <SectionSeparator />

      {/* CTA Section */}
      <FadeInSection>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Ready to enforce configuration discipline?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start with the playground. Full documentation is in the nav.
            </p>
            <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/playground"
                className="inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl bg-foreground px-8 py-3.5 text-center text-sm font-semibold text-background transition-all duration-150 hover:scale-[1.02] hover:bg-foreground/90 hover:shadow-lg dark:bg-gray-100 dark:text-zinc-950 dark:hover:bg-white sm:text-base"
              >
                Open Playground
              </Link>
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-2xl border border-zinc-300 bg-white px-8 py-3.5 text-sm font-semibold text-zinc-950 shadow-sm transition-all duration-150 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800 sm:text-base"
              >
                <Github className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
                Star on GitHub
              </a>
            </div>
          </div>
        </section>
      </FadeInSection>
    </div>
  )
}
