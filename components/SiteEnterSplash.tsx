'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { LayoutGroup, motion } from 'framer-motion'
import BrandName from '@/components/BrandName'
import { IntroSplashCompleteContext } from '@/components/intro-splash-context'
import { BRAND_LAYOUT_SPRING, butterTransition } from '@/lib/motion-presets'

export default function SiteEnterSplash({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<'splash' | 'ready'>('splash')

  useEffect(() => {
    if (status !== 'splash') return

    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    let cancelled = false
    const minMs = 900

    const run = async () => {
      try {
        await Promise.race([
          document.fonts?.ready ?? Promise.resolve(),
          new Promise<void>((r) => setTimeout(r, 2500)),
        ])
      } catch {
        /* ignore */
      }
      await new Promise<void>((r) => setTimeout(r, minMs))
      if (!cancelled) setStatus('ready')
    }
    void run()

    return () => {
      cancelled = true
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [status])

  useEffect(() => {
    if (status === 'ready') {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [status])

  return (
    <LayoutGroup id="genesis-intro-brand">
      <IntroSplashCompleteContext.Provider value={status === 'ready'}>
        {status === 'splash' && (
          <div
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background px-6"
            aria-hidden
          >
            <motion.div
              layoutId="genesis-env-home-brand"
              className="inline-block"
              transition={BRAND_LAYOUT_SPRING}
            >
              <BrandName className="block text-4xl text-foreground sm:text-5xl md:text-6xl lg:text-7xl" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={butterTransition(0.45, 0.12)}
              className="mt-5 font-mono text-xs uppercase tracking-[0.35em] text-accent/90 sm:text-sm"
            >
              Configuration discipline
            </motion.p>
          </div>
        )}
        {children}
      </IntroSplashCompleteContext.Provider>
    </LayoutGroup>
  )
}
