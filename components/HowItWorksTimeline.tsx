'use client'

import { Fragment, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { butterTransition } from '@/lib/motion-presets'
import {
  Braces,
  Clock,
  FileCode2,
  Lock,
  ShieldCheck,
  Users,
} from 'lucide-react'

const processSteps = [
  {
    num: '01',
    title: 'Define',
    Icon: FileCode2,
    description:
      'Commit a `.env.template` in your repo. That one versioned file lists every key your app expects, without secrets.',
  },
  {
    num: '02',
    title: 'Generate',
    Icon: Braces,
    description:
      'Run `npx genesis-env` (or `npx genesis-env generate`) from the project root, answer the prompts once per key, and get a local `.env` written from the template.',
  },
  {
    num: '03',
    title: 'Onboard',
    Icon: Users,
    description:
      'Every developer runs the same command against the same template. Same prompts, same shape, so new hires are not reverse engineering Slack screenshots.',
  },
] as const

const outcomes = [
  {
    title: 'Fewer errors',
    Icon: ShieldCheck,
    description:
      'One template and one generate flow means fewer missing keys and less copying and pasting drift between laptops.',
  },
  {
    title: 'Aligned teams',
    Icon: Users,
    description:
      'Everyone pulls from the same template. Onboarding is running the CLI, not chasing tribal knowledge.',
  },
  {
    title: 'Faster setup',
    Icon: Clock,
    description: 'Regenerate `.env` in seconds when keys change instead of editing ten local variants by hand.',
  },
  {
    title: 'Production confidence',
    Icon: Lock,
    description:
      'Ship knowing every developer materialized their env from the committed template your team already agreed on.',
  },
] as const

function StepConnector() {
  return (
    <div
      className="hidden h-[4.5rem] w-8 shrink-0 items-center self-start pt-2 lg:flex"
      aria-hidden
    >
      <div className="flex h-px w-full items-center">
        <span className="h-px flex-1 border-t border-dashed border-accent/45" />
        <span className="mx-0.5 h-2 w-2 shrink-0 rounded-full bg-accent shadow-[0_0_10px_rgb(var(--color-accent)/0.35)]" />
        <span className="h-px flex-1 border-t border-dashed border-accent/45" />
      </div>
    </div>
  )
}

function ProcessStepBlock({
  step,
  index,
}: {
  step: (typeof processSteps)[number]
  index: number
}) {
  const Icon = step.Icon
  return (
    <Fragment key={step.num}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={butterTransition(0.45, index * 0.06)}
        className="relative flex min-w-0 flex-1 flex-col border-l-2 border-accent/25 pl-5 lg:border-l-0 lg:pl-0 lg:text-left"
      >
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
          {step.num}
        </span>
        <div className="mt-3 flex h-14 w-14 items-center justify-center rounded-full border border-accent/45 bg-accent/10 text-accent">
          <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
        </div>
        <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">{step.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
      </motion.div>
      {index < processSteps.length - 1 && (
        <>
          <StepConnector />
          <div className="my-2 h-px w-full shrink-0 border-t border-dashed border-accent/30 lg:hidden" aria-hidden />
        </>
      )}
    </Fragment>
  )
}

function OutcomeCard({
  item,
  index,
}: {
  item: (typeof outcomes)[number]
  index: number
}) {
  const Icon = item.Icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={butterTransition(0.45, index * 0.05)}
      className="flex flex-col items-start"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
        <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
      </div>
      <h3 className="mt-4 text-base font-semibold text-foreground">{item.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
    </motion.div>
  )
}

export default function HowItWorksTimeline() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <div ref={sectionRef} className="relative bg-background">
      {/* How it works */}
      <section className="border-b border-border/40 py-16 sm:py-20 lg:py-24 dark:border-white/[0.06]">
        <div className="mx-auto w-full max-w-[min(100%,1400px)] px-4 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16 xl:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={butterTransition(0.5)}
              className="max-w-lg lg:sticky lg:top-28 lg:self-start"
            >
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                How it works
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-[2.35rem] lg:leading-[1.12]">
                Three steps to configuration that{' '}
                <span className="font-display text-[1.65rem] italic font-normal text-foreground/95 sm:text-[2rem] lg:text-[2.15rem]">
                  just works
                </span>
                .
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Commit a template, run generate from the project root, and onboard the whole team on the same flow. No
                mystery commands, no stale docs.
              </p>
            </motion.div>

            <div className="flex min-w-0 flex-col gap-0 lg:flex-row lg:items-start lg:gap-0">
              {processSteps.map((step, index) => (
                <ProcessStepBlock key={step.num} step={step} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The outcome */}
      <section className="bg-surface/25 py-16 sm:py-20 lg:py-24 dark:bg-white/[0.02]">
        <div className="mx-auto w-full max-w-[min(100%,1400px)] px-4 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16 xl:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={butterTransition(0.5)}
              className="max-w-lg"
            >
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                The outcome
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-[2.35rem]">
                One source of truth.{' '}
                <span className="font-display text-[1.65rem] italic font-normal text-foreground/95 sm:text-[2rem] lg:text-[2.15rem]">
                  Zero surprises
                </span>
                .
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Bootstrap once with{' '}
                <code className="rounded bg-muted/80 px-1 py-0.5 font-mono text-sm text-foreground/90 dark:bg-white/[0.06]">
                  npx genesis-env init
                </code>
                : creates the starter template, generates an empty local{' '}
                <code className="rounded bg-muted/80 px-1 py-0.5 font-mono text-sm text-foreground/90 dark:bg-white/[0.06]">
                  .env
                </code>
                , and ensures{' '}
                <code className="rounded bg-muted/80 px-1 py-0.5 font-mono text-sm text-foreground/90 dark:bg-white/[0.06]">
                  .env
                </code>{' '}
                is ignored by git (creating or updating{' '}
                <code className="rounded bg-muted/80 px-1 py-0.5 font-mono text-sm text-foreground/90 dark:bg-white/[0.06]">
                  .gitignore
                </code>{' '}
                automatically).
              </p>
            </motion.div>

            <div className="grid min-w-0 grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-2 xl:grid-cols-4 xl:gap-8">
              {outcomes.map((item, index) => (
                <OutcomeCard key={item.title} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
