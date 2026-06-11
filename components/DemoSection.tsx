'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

export default function DemoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/30 border-t border-border/50"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl min-w-0 mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Virtual tour</h2>
        <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
          Explore genesis-env in the browser — run commands and see output live, like a hands-on exhibit.
        </p>
        <motion.div
          className="inline-block max-w-full rounded-2xl border border-border/60 bg-card/70 p-5 shadow-xl backdrop-blur-sm sm:p-8 dark:border-white/10 dark:bg-gray-900/50"
          whileHover={{
            boxShadow: '0 20px 40px -15px rgba(34, 211, 238, 0.12), 0 0 0 1px rgba(255,255,255,0.05)',
            transition: { duration: 0.2 },
          }}
        >
          <div className="mb-6 max-w-full overflow-x-auto text-left">
            <div className="min-w-0 whitespace-nowrap font-mono text-xs text-muted-foreground sm:text-sm">
              $ npx genesis-env validate .env.template
            </div>
            <div className="mt-2 min-w-0 whitespace-nowrap font-mono text-xs text-green-400/90 sm:text-sm">
              ✓ Validation complete. 12 keys found.
            </div>
          </div>
          <Link
            href="/playground"
            className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-2xl bg-foreground px-8 py-3.5 text-sm font-semibold text-background transition-all duration-150 hover:scale-[1.02] hover:bg-foreground/90 hover:shadow-lg dark:bg-gray-100 dark:text-zinc-950 dark:hover:bg-white sm:text-base"
          >
            Open Playground
            <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
