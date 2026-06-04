'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import DocsLandingHero from '@/components/DocsLandingHero'

const docSections = [
  {
    title: 'Installation',
    href: '/docs/installation',
    description: 'npm i, npx, optional global install, and verify from project root',
  },
  {
    title: 'Commands',
    href: '/docs/commands',
    description: 'init, generate (default), and --force / -f',
  },
  {
    title: 'Templates & .env',
    href: '/docs/validation',
    description: 'Template files, defaults, generate behavior, and quick examples',
  },
  {
    title: 'Teams & onboarding',
    href: '/docs/corporate-systems',
    description: 'Shared templates, contributor flow, and honest CI notes',
  },
]

export default function DocsPage() {
  return (
    <div className="docs-atmosphere relative min-h-screen w-full pb-32 pt-24 font-mono text-foreground">
      <div className="docs-atmosphere-grid" aria-hidden />
      <div className="docs-atmosphere-bloom" aria-hidden />
      <div className="docs-atmosphere-vignette" aria-hidden />
      <div className="docs-atmosphere-grain" aria-hidden />
      <div className="docs-crosshair-layer" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-[min(100%,1800px)] px-5 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-2 border-b border-border/50 pb-1 sm:mb-3 dark:border-white/[0.06]"
        >
          <DocsLandingHero />
        </motion.div>

        <div className="mx-auto w-full max-w-3xl space-y-4">
          {docSections.map((section, index) => (
            <motion.div
              key={section.href}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 + index * 0.05 }}
            >
              <Link
                href={section.href}
                className="group block border border-border/50 bg-transparent px-6 py-8 transition-colors duration-300 hover:border-border dark:border-white/[0.08] dark:hover:border-white/[0.18]"
              >
                <h2 className="mb-3 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.12em] text-foreground">
                  {section.title}
                  <span className="text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground/80">
                    →
                  </span>
                </h2>
                <p className="max-w-lg text-sm leading-relaxed tracking-[0.02em] text-muted-foreground">
                  {section.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.28 }}
          className="mx-auto mt-20 max-w-3xl border border-border/50 px-6 py-10 dark:border-white/[0.08]"
        >
          <h2 className="mb-4 text-sm font-medium uppercase tracking-[0.12em] text-foreground">Quick start</h2>
          <p className="max-w-lg text-sm leading-[1.8] text-muted-foreground">
            Install (or use <code className="text-docsBlue/90">npx</code> without installing), then follow the command
            reference for <code className="text-docsBlue/90">init</code> and{' '}
            <code className="text-docsBlue/90">generate</code>. Template rules and examples live under Templates &amp;{' '}
            <code className="text-docsBlue/90">.env</code>.
          </p>
          <div className="mt-8 flex flex-wrap gap-10 text-sm uppercase tracking-[0.12em] text-muted-foreground">
            <Link href="/docs/installation" className="transition-colors hover:text-foreground">
              Installation →
            </Link>
            <Link href="/docs/commands" className="transition-colors hover:text-foreground">
              Commands →
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
