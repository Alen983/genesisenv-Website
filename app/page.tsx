'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import TerminalHero from '@/components/TerminalHero'
import Link from 'next/link'

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
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
          >
            genesis-env
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            Configuration discipline for environment variables
          </motion.p>
          
          <TerminalHero />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/docs"
              className="px-6 py-3 bg-accent text-background font-semibold rounded-lg hover:bg-accent/90 transition-colors hover:shadow-lg hover:shadow-accent/20"
            >
              Get Started
            </Link>
            <Link
              href="/playground"
              className="px-6 py-3 border border-gray-700 text-white font-semibold rounded-lg hover:border-accent hover:text-accent transition-colors"
            >
              Try Playground
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <FadeInSection>
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              genesis-env is not a tool.
            </h2>
            <p className="text-2xl md:text-3xl text-accent font-semibold mb-8">
              It&apos;s a configuration discipline.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              genesis-env enforces standards, validates configurations, and ensures your environment variables
              are never a source of production failures. It&apos;s the difference between chaos and control.
            </p>
          </div>
        </section>
      </FadeInSection>

      {/* Features Section */}
      <FadeInSection>
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Why genesis-env?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-surface border border-gray-800 rounded-lg p-6">
                <div className="text-3xl mb-4">✓</div>
                <h3 className="text-xl font-semibold mb-2">Validation</h3>
                <p className="text-gray-400">
                  Catch missing or invalid environment variables before deployment.
                </p>
              </div>
              <div className="bg-surface border border-gray-800 rounded-lg p-6">
                <div className="text-3xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold mb-2">Discipline</h3>
                <p className="text-gray-400">
                  Enforce standards across teams and prevent configuration drift.
                </p>
              </div>
              <div className="bg-surface border border-gray-800 rounded-lg p-6">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-2">CI/CD Ready</h3>
                <p className="text-gray-400">
                  Integrate validation into your pipeline. Fail fast, deploy safely.
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* CTA Section */}
      <FadeInSection>
        <section className="py-20 px-4 sm:px-6 lg:px-8">
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
                className="px-6 py-3 bg-accent text-background font-semibold rounded-lg hover:bg-accent/90 transition-colors hover:shadow-lg hover:shadow-accent/20"
              >
                Open Playground
              </Link>
              <Link
                href="/docs"
                className="px-6 py-3 border border-gray-700 text-white font-semibold rounded-lg hover:border-accent hover:text-accent transition-colors"
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
