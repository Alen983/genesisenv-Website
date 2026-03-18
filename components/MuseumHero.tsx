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
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 50%, #0F0F0F 100%)',
        backgroundImage: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 50%, #0F0F0F 100%), radial-gradient(circle at 20% 80%, rgba(34,211,238,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(229,184,76,0.02) 0%, transparent 40%)',
      }}
    >
      <ParticleField />
      <HeroFloatingIcons />

      <div className="relative z-10 w-full max-w-6xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm md:text-base text-gray-500 font-medium mb-6 tracking-widest uppercase"
        >
          genesis-env
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white"
        >
          STOP BREAKING YOUR .ENV FILES.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex justify-center w-full"
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
          className="mt-8 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
        >
          Validate, generate, and sync environment configs — consistently.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/playground"
            className="px-8 py-3.5 rounded-full bg-gray-100 text-background font-semibold hover:bg-white transition-all duration-150 hover:scale-[1.02] hover:shadow-lg"
          >
            Try genesis-env
          </Link>
          <Link
            href="/docs"
            className="px-6 py-3 rounded-full border-2 border-gray-600 text-gray-300 font-semibold hover:border-gray-400 hover:text-white transition-all duration-150"
          >
            Docs
          </Link>
          <Link
            href="/playground"
            className="px-6 py-3 rounded-full border-2 border-gray-600 text-gray-300 font-semibold hover:border-gray-400 hover:text-white transition-all duration-150"
          >
            Playground
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
