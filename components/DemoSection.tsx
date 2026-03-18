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
      className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/30 border-t border-gray-800/50"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Virtual tour</h2>
        <p className="text-gray-500 mb-10 max-w-xl mx-auto">
          Explore genesis-env in the browser — run commands and see output live, like a hands-on exhibit.
        </p>
        <motion.div
          className="rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur-sm p-8 shadow-xl inline-block"
          whileHover={{
            boxShadow: '0 20px 40px -15px rgba(34, 211, 238, 0.12), 0 0 0 1px rgba(255,255,255,0.05)',
            transition: { duration: 0.2 },
          }}
        >
          <div className="font-mono text-sm text-gray-400 mb-4 text-left">
            $ npx genesis-env validate .env.template
          </div>
          <div className="font-mono text-sm text-green-400/90 text-left mb-6">
            ✓ Validation complete. 12 keys found.
          </div>
          <Link
            href="/playground"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gray-100 text-background font-semibold hover:bg-white transition-all duration-150 hover:scale-[1.02] hover:shadow-lg"
          >
            Open Playground
            <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
