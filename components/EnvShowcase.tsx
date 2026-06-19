'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, FileText, Lock, Monitor, ShieldCheck, type LucideIcon } from 'lucide-react'
import { butterTransition } from '@/lib/motion-presets'

const TEMPLATE_SNIPPET = `# .env.template (committed; no secrets)
DATABASE_URL=
API_KEY=
STRIPE_WEBHOOK_SECRET=
NODE_ENV=development`

const ENV_SNIPPET = `# .env (local; gitignored)
DATABASE_URL=postgres://localhost:5432/app
API_KEY=sk_live_xxxx
STRIPE_WEBHOOK_SECRET=whsec_xxx_
NODE_ENV=development`

function WorkflowCard({
  variant,
  title,
  icon: Icon,
  children,
  footer,
}: {
  variant: 'template' | 'generated'
  title: string
  icon: LucideIcon
  children: React.ReactNode
  footer: React.ReactNode
}) {
  const isGenerated = variant === 'generated'
  return (
    <div
      className={`flex min-w-0 flex-1 flex-col rounded-xl bg-card/80 p-4 shadow-sm sm:p-5 ${
        isGenerated
          ? 'border-2 border-accent/70 ring-1 ring-accent/25 dark:border-accent/60 dark:ring-accent/20'
          : 'border border-border/70 dark:border-white/12'
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-start gap-2 font-sans text-[13px] font-bold uppercase tracking-wide text-foreground sm:text-sm">
          <Icon className="mt-0.5 h-4 w-4 shrink-0 sm:h-5 sm:w-5" strokeWidth={2} aria-hidden />
          <span className="min-w-0 break-words leading-snug">{title}</span>
        </div>
        <span
          className="h-2 w-2 shrink-0 rounded-full bg-accent shadow-[0_0_8px_rgb(var(--color-accent)/0.45)]"
          aria-hidden
        />
      </div>
      <div className="min-w-0 flex-1 overflow-x-hidden rounded-lg border border-border/40 bg-muted/35 p-3.5 dark:border-white/[0.06] dark:bg-black/25 sm:p-4">
        {children}
      </div>
      <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground sm:text-xs">{footer}</div>
    </div>
  )
}

export default function EnvShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-background px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={butterTransition(0.5)}
        className="mx-auto min-w-0 max-w-7xl"
      >
        {/* Copy gets a readable cap; cards column flexes to use remaining width (avoids squeezed twin cards). */}
        <div className="grid min-w-0 gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:items-start lg:gap-12 xl:gap-16">
          {/* Copy column */}
          <div className="min-w-0 max-w-xl lg:max-w-none lg:pt-1">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-accent">Workflow</p>
            <h2 className="mt-4 font-display text-4xl font-normal leading-[1.15] tracking-normal text-foreground sm:text-5xl md:text-[2.75rem]">
              <span className="inline">From template to </span>
              <span className="inline italic pr-[0.4em] sm:pr-[0.5em]">local</span>
              <span className="inline not-italic">.env</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              One file describes every key your app needs. Developers run the CLI to materialize a real{' '}
              <code className="rounded bg-muted/80 px-1 py-0.5 font-mono text-sm text-foreground/90 dark:bg-white/[0.06]">
                .env
              </code>{' '}
              with their own values, without guessing names or copying and pasting from Slack.
            </p>
          </div>

          {/* Visual workflow — row stretches with viewport; each card grows equally */}
          <div className="flex min-w-0 w-full flex-col items-stretch gap-6 sm:flex-row sm:items-stretch sm:gap-5 md:gap-6 lg:min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={butterTransition(0.45, 0.06)}
              className="min-w-0 flex-1"
            >
              <WorkflowCard
                variant="template"
                title="Template (in repo)"
                icon={FileText}
                footer={
                  <>
                    <Lock className="h-3.5 w-3.5 shrink-0 opacity-70" strokeWidth={2} aria-hidden />
                    <span>Committed to your repository</span>
                  </>
                }
              >
                <pre className="max-h-[20rem] overflow-x-hidden overflow-y-auto whitespace-pre-wrap break-all font-mono text-[11px] leading-relaxed text-foreground/90 sm:text-xs md:text-sm">
                  {TEMPLATE_SNIPPET}
                </pre>
              </WorkflowCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={butterTransition(0.4, 0.12)}
              className="flex shrink-0 items-center justify-center self-center sm:flex-col sm:justify-center sm:pt-10 md:pt-12"
              aria-hidden
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/18 ring-1 ring-accent/30 dark:bg-accent/15 dark:ring-accent/35 sm:h-12 sm:w-12 md:h-14 md:w-14">
                <ArrowRight
                  className="h-5 w-5 rotate-90 text-foreground sm:h-5 sm:w-5 sm:rotate-0 md:h-6 md:w-6"
                  strokeWidth={2.25}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={butterTransition(0.45, 0.18)}
              className="min-w-0 flex-1"
            >
              <WorkflowCard
                variant="generated"
                title="Generated (on your machine)"
                icon={Monitor}
                footer={
                  <>
                    <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-muted-foreground" strokeWidth={2} aria-hidden />
                    <span>Local values. Ignored. In your control.</span>
                  </>
                }
              >
                <pre className="max-h-[20rem] overflow-x-hidden overflow-y-auto whitespace-pre-wrap break-all font-mono text-[11px] leading-relaxed text-foreground/90 sm:text-xs md:text-sm">
                  {ENV_SNIPPET}
                </pre>
              </WorkflowCard>
            </motion.div>
          </div>

          <p className="text-center text-xs text-muted-foreground/90 sm:text-sm lg:col-span-2">
            Example values only. Your real <code className="text-foreground/80">.env</code> stays local and out of
            version control.
          </p>
        </div>
      </motion.div>
    </section>
  )
}
