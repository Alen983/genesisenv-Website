'use client'

import { motion } from 'framer-motion'
import BrandName from '@/components/BrandName'
import PlaygroundEditor from '@/components/PlaygroundEditor'
import { butterTransition } from '@/lib/motion-presets'

const PLAYGROUND_ASCII_LINES = [
  '  _____  _                                             _ ',
  ' |  __ \\| |                                           | |',
  ' | |__) | | __ _ _   _  __ _ _ __ ___  _   _ _ __   __| |',
  " |  ___/| |/ `| | | |/ `| | '__/ _\\| | | | '_\\ / `| |",
  ' | |    | | (_| | |_| | (_| | | | (_) | |_| | | | | (_| |',
  ' |_|    |_|\\__,_|\\__, |\\__, |_|  \\___/ \\__,_|_| |_|\\__,_|',
  '                  __/ | __/ |                            ',
  '                 |___/ |___/                             ',
] as const

const PLAYGROUND_ASCII = PLAYGROUND_ASCII_LINES.join('\n')

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen bg-background pb-20 pt-24 font-mono text-foreground">
      <div className="mx-auto w-full max-w-[min(100%,1800px)] px-5 sm:px-8 lg:px-12 xl:px-16">
        <motion.p
          className="mb-6 text-left text-xs uppercase tracking-[0.28em] text-muted-foreground sm:mb-7 sm:text-[13px]"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={butterTransition(0.45)}
        >
          [02] INTERACTIVE
        </motion.p>

        <div className="min-w-0 w-full text-left">
          <h1 className="sr-only">Playground</h1>

          <motion.div
            className="min-w-0 w-full"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={butterTransition(0.65)}
          >
            <pre
              className="docs-ascii-headline w-full overflow-x-auto pb-1 font-mono leading-[1.05] tracking-normal text-foreground [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [font-size:clamp(0.38rem,1.05vw+0.32rem,0.95rem)] sm:leading-[1.04] dark:text-zinc-50"
              style={{ fontFeatureSettings: '"liga" 0' }}
              aria-hidden
            >
              {PLAYGROUND_ASCII}
            </pre>
          </motion.div>

          <motion.p
            className="mt-6 max-w-[36rem] text-left text-sm leading-[1.75] tracking-[0.02em] text-muted-foreground sm:mt-7 sm:text-[0.9375rem] sm:leading-[1.8]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={butterTransition(0.5, 0.08)}
          >
            Test <BrandName className="text-[0.9375rem] sm:text-[0.9375rem]" /> in the browser. Run{' '}
            <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-foreground/90">init</code> and{' '}
            <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-foreground/90">generate</code>{' '}
            simulations and see the same prompt and write flow the CLI uses.
          </motion.p>
        </div>

        <div className="mt-10 w-full sm:mt-11">
          <PlaygroundEditor />
        </div>
      </div>
    </div>
  )
}
