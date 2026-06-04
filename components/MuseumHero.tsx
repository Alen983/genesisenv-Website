'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import ParticleField from '@/components/ParticleField'
import TerminalHero from '@/components/TerminalHero'
import HeroFloatingIcons from '@/components/HeroFloatingIcons'

export default function MuseumHero() {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <section
      ref={ref}
      className="museum-hero-bg relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-20 pt-24 sm:px-6 lg:px-8"
    >
      <ParticleField />
      <HeroFloatingIcons />

      <div className="relative z-10 mx-auto w-full min-w-0 max-w-6xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 text-sm font-medium uppercase tracking-widest text-muted-foreground md:text-base"
        >
          genesis-env
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="break-words text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
        >
          STOP BREAKING YOUR .ENV FILES.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex min-w-0 w-full justify-center px-0.5"
        >
          <TerminalHero
            command="npx genesis-env validate .env.template"
            highlightKeyword="validate"
            accentVariant="cyan"
            compact={false}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl"
        >
          Validate, generate, and sync environment configs — consistently.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/playground"
            className="rounded-full bg-foreground px-8 py-3.5 font-semibold text-background transition-all duration-150 hover:bg-foreground/90 hover:shadow-lg dark:bg-gray-100 dark:text-zinc-950 dark:hover:bg-white"
          >
            Try genesis-env
          </Link>
          <Link
            href="/docs"
            className="rounded-full border-2 border-border px-6 py-3 font-semibold text-muted-foreground transition-all duration-150 hover:border-border hover:text-foreground"
          >
            Docs
          </Link>
          <Link
            href="/playground"
            className="rounded-full border-2 border-border px-6 py-3 font-semibold text-muted-foreground transition-all duration-150 hover:border-border hover:text-foreground"
          >
            Playground
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
