'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Github, Terminal } from 'lucide-react'
import { GITHUB_REPO_URL } from '@/lib/site'
import BrandName from '@/components/BrandName'
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
          className="mb-6 text-muted-foreground md:text-base"
        >
          <BrandName className="text-lg md:text-xl" />
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
            compact={false}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl"
        >
          Define once. Validate automatically. Synchronize everywhere.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center"
        >
          <Link
            href="/playground"
            className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-2xl bg-foreground px-8 py-3.5 text-center text-sm font-semibold text-background transition-all duration-150 hover:bg-foreground/90 hover:shadow-lg dark:bg-gray-100 dark:text-zinc-950 dark:hover:bg-white sm:text-base"
          >
            <Terminal className="h-5 w-5 shrink-0" strokeWidth={2} aria-hidden />
            <span className="inline-flex items-center gap-1.5">
              Try{' '}
              <BrandName className="text-[0.9375rem] !text-inherit sm:text-base" />
            </span>
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
        </motion.div>
      </div>
    </section>
  )
}
