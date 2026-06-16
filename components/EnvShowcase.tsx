'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const TEMPLATE_SNIPPET = `# .env.template (committed — no secrets)
DATABASE_URL=
API_KEY=
STRIPE_WEBHOOK_SECRET=
NODE_ENV=development`

const ENV_SNIPPET = `# .env (local — gitignored)
DATABASE_URL=postgres://localhost:5432/app
API_KEY=sk_live_xxx…
STRIPE_WEBHOOK_SECRET=whsec_xxx…
NODE_ENV=development`

export default function EnvShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-background px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mx-auto min-w-0 max-w-6xl"
      >
        <h2 className="mb-4 text-center text-3xl font-bold text-foreground md:text-4xl">From template to local env</h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
          One file describes every key your app needs. Developers run the CLI to materialize a real{' '}
          <code className="text-foreground/85">.env</code> with their own values — without guessing names or
          copy-pasting from Slack.
        </p>
        <div className="grid min-w-0 gap-8 lg:grid-cols-2 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="min-w-0 rounded-2xl border border-border/60 bg-card/50 p-5 shadow-lg backdrop-blur-sm dark:border-white/10 dark:bg-gray-900/40 sm:p-6"
          >
            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-accent">
              In the repo
            </p>
            <pre className="max-h-[22rem] overflow-auto whitespace-pre-wrap rounded-lg border border-border/50 bg-muted/30 p-4 font-mono text-xs leading-relaxed text-foreground/90 dark:border-gray-700/50 dark:bg-black/35 dark:text-gray-300 sm:text-sm">
              {TEMPLATE_SNIPPET}
            </pre>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.16 }}
            className="min-w-0 rounded-2xl border border-accent/25 bg-card/60 p-5 shadow-lg backdrop-blur-sm dark:bg-gray-900/50 sm:p-6"
          >
            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-accent">
              On your machine
            </p>
            <pre className="max-h-[22rem] overflow-auto whitespace-pre-wrap rounded-lg border border-border/50 bg-muted/30 p-4 font-mono text-xs leading-relaxed text-foreground/90 dark:border-gray-700/50 dark:bg-black/35 dark:text-gray-300 sm:text-sm">
              {ENV_SNIPPET}
            </pre>
            <p className="mt-3 text-xs text-muted-foreground">
              Example values only. Your real <code className="text-foreground/80">.env</code> stays local and out of
              version control.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
