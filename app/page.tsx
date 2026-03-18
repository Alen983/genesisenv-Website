'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import MuseumHero from '@/components/MuseumHero'
import HowItWorksTimeline from '@/components/HowItWorksTimeline'
import FeatureGallery from '@/components/FeatureGallery'
import DemoSection from '@/components/DemoSection'
import ScrollProgress from '@/components/ScrollProgress'

function SectionSeparator() {
  return (
    <div
      className="h-px w-full bg-gradient-to-r from-transparent via-accentCyan/30 to-transparent"
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              genesis-env is not a tool.
            </h2>
            <p className="text-2xl md:text-3xl text-accentCyan font-semibold mb-8">
              It&apos;s a configuration discipline.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              genesis-env enforces standards, validates configurations, and ensures your environment variables
              are never a source of production failures. It&apos;s the difference between chaos and control.
            </p>
          </div>
        </section>
      </FadeInSection>

      <SectionSeparator />

      <FeatureGallery />

      <SectionSeparator />

      <DemoSection />

      <SectionSeparator />

      {/* CTA Section */}
      <FadeInSection>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to enforce configuration discipline?
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Start with the playground or dive into the documentation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/playground"
                className="px-8 py-3.5 rounded-full bg-gray-100 text-background font-semibold hover:bg-white transition-all duration-150 hover:scale-[1.02] hover:shadow-lg"
              >
                Open Playground
              </Link>
              <Link
                href="/docs"
                className="px-6 py-3 rounded-full border-2 border-gray-600 text-gray-300 font-semibold hover:border-gray-400 hover:text-white transition-all duration-150"
              >
                Read Docs
              </Link>
            </div>
          </div>
        </section>
      </FadeInSection>
    </div>
  )
}
