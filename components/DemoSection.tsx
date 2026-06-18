'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import BrandName from '@/components/BrandName'

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
          Explore <BrandName className="text-base" /> in the browser. Run commands and see output live, like a hands-on
          exhibit.
        </p>
        <motion.div
          className="inline-block max-w-full rounded-2xl border border-border/60 bg-card/70 p-5 shadow-xl backdrop-blur-sm sm:p-8 dark:border-white/10 dark:bg-gray-900/50"
          whileHover={{
            boxShadow: 'var(--demo-card-hover-shadow)',
            transition: { duration: 0.2 },
          }}
        >
          <pre className="mb-6 max-w-full overflow-x-auto text-left font-mono text-xs leading-relaxed text-accent sm:text-sm">
            <span>$ npx genesis-env</span>
            {'\n'}
            <span>✔ Found .env.template</span>
            {'\n'}
            <span>? DATABASE_URL: (postgres://localhost:5432/app)</span>
            {'\n'}
            <span>? API_KEY:</span>
            {'\n'}
            <span>? NODE_ENV: (development)</span>
            {'\n'}
            <span>✔ .env written successfully.</span>
          </pre>
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
