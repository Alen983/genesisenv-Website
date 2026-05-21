'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

type RoadmapStatus = 'completed' | 'in-progress' | 'planned' | 'future'

const ROADMAP_ITEMS: {
  id: string
  title: string
  description: string
  status: RoadmapStatus
  quarter: string
}[] = [
  {
    id: '01',
    title: 'CI/CD INTEGRATION',
    description:
      'Native plugins for GitHub Actions, GitLab CI, and Jenkins. Validate environment variables in your pipeline automatically.',
    status: 'completed',
    quarter: 'Q4 2024',
  },
  {
    id: '02',
    title: 'CORPORATE SYSTEMS INTEGRATION',
    description:
      'Enterprise features for managing environment variables across teams, with role-based access and audit logs.',
    status: 'completed',
    quarter: 'Q4 2024',
  },
  {
    id: '03',
    title: 'VALIDATION ENGINE V2',
    description:
      'Advanced validation rules, custom validators, and support for complex environment variable patterns.',
    status: 'in-progress',
    quarter: 'Q2 2026',
  },
  {
    id: '04',
    title: 'CONFIGURATION GOVERNANCE',
    description:
      'Policy enforcement, compliance checks, and automated remediation for environment variable violations.',
    status: 'planned',
    quarter: 'TBD',
  },
  {
    id: '05',
    title: 'MULTI-ENVIRONMENT MANAGEMENT',
    description:
      'Manage and validate environment variables across development, staging, and production environments.',
    status: 'planned',
    quarter: 'TBD',
  },
  {
    id: '06',
    title: 'CLI ENHANCEMENTS',
    description:
      'Interactive mode, better error messages, and support for environment variable templates with inheritance.',
    status: 'planned',
    quarter: 'TBD',
  },
]

const STATUS_LABEL: Record<RoadmapStatus, string> = {
  completed: 'COMPLETED',
  'in-progress': 'IN PROGRESS',
  planned: 'PLANNED',
  future: 'FUTURE',
}

const ROADMAP_TITLE_ASCII_LINES = [
  '  _____                 _                       ',
  ' |  __ \\               | |                      ',
  ' | |__) |___   __ _  __| |_ __ ___   __ _ _ __  ',
  " |  _  // _ \\ / _` |/ _` | '_ ` _ \\ / _` | '_ \\ ",
  ' | | \\ \\ (_) | (_| | (_| | | | | | | (_| | |_) |',
  ' |_|  \\_\\___/ \\__,_|\\__,_|_| |_| |_|\\__,_| .__/ ',
  '                                         | |    ',
  '                                         |_|    ',
] as const

const ROADMAP_TITLE_ASCII = ROADMAP_TITLE_ASCII_LINES.join('\n')

const SIDEBAR_ASCII = [
  '    .-----.',
  '  ./       \\.',
  ' |  *     *  |',
  '  .\\  ___  /.',
  "    `-----'",
].join('\n')

function SystemOriginGraphic() {
  return (
    <div
      className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28"
      aria-hidden
    >
      <div className="roadmap-orbit-spin pointer-events-none absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full text-sky-400/35"
          fill="none"
        >
          <ellipse
            cx="50"
            cy="50"
            rx="38"
            ry="14"
            stroke="currentColor"
            strokeWidth="0.5"
            transform="rotate(-18 50 50)"
          />
          <ellipse
            cx="50"
            cy="50"
            rx="32"
            ry="36"
            stroke="currentColor"
            strokeWidth="0.5"
            transform="rotate(52 50 50)"
          />
          <ellipse
            cx="50"
            cy="50"
            rx="28"
            ry="40"
            stroke="currentColor"
            strokeWidth="0.35"
            transform="rotate(-42 50 50)"
          />
        </svg>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="roadmap-core-pulse h-10 w-10 rounded-full bg-sky-400/25 blur-md" />
        <div className="absolute h-5 w-5 rounded-full bg-sky-300 shadow-[0_0_24px_rgba(56,189,248,0.85),0_0_48px_rgba(14,165,233,0.35)]" />
      </div>
    </div>
  )
}

function TimelineNode({ status }: { status: RoadmapStatus }) {
  if (status === 'completed') {
    return (
      <div className="relative z-[1] flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400/60 bg-emerald-500/15 shadow-[0_0_18px_rgba(52,211,153,0.35)]">
        <Check className="h-4 w-4 text-emerald-400" strokeWidth={2.5} aria-hidden />
      </div>
    )
  }
  if (status === 'in-progress') {
    return (
      <div className="relative z-[1] flex h-10 w-10 items-center justify-center">
        <div className="roadmap-core-pulse-fast absolute h-9 w-9 rounded-full bg-sky-400/30 blur-md" />
        <div className="relative h-4 w-4 rounded-full bg-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.9),0_0_40px_rgba(14,165,233,0.45)] ring-2 ring-sky-400/80" />
      </div>
    )
  }
  if (status === 'future') {
    return (
      <div className="relative z-[1] h-4 w-4 rounded-full border border-zinc-700 bg-zinc-900/80" />
    )
  }
  return (
    <div className="relative z-[1] h-4 w-4 rounded-full border border-zinc-600 bg-zinc-900/90 shadow-inner" />
  )
}

function RoadmapCard({ item }: { item: (typeof ROADMAP_ITEMS)[number] }) {
  const label = STATUS_LABEL[item.status]
  const labelColor =
    item.status === 'completed'
      ? 'text-emerald-400'
      : item.status === 'in-progress'
        ? 'text-sky-400'
        : item.status === 'future'
          ? 'text-zinc-600'
          : 'text-zinc-500'

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`relative rounded-lg border border-zinc-800/90 bg-zinc-950/80 px-5 py-4 backdrop-blur-sm sm:px-6 sm:py-5 ${
        item.status === 'in-progress'
          ? 'shadow-[0_0_0_1px_rgba(56,189,248,0.12),0_0_40px_-8px_rgba(14,165,233,0.25)]'
          : 'shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]'
      }`}
    >
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.14em] sm:text-xs">
        <span className="text-zinc-500">{item.id}</span>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-right">
          <span className={labelColor}>{label}</span>
          <span className="text-zinc-600">{item.quarter}</span>
        </div>
      </div>
      <h2 className="font-sans text-base font-bold uppercase tracking-wide text-zinc-100 sm:text-lg">
        {item.title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-500 sm:text-[0.9375rem]">
        {item.description}
      </p>
    </motion.article>
  )
}

export default function RoadmapPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black pb-24 pt-24 text-white">
      {/* Starfield + grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        aria-hidden
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 10% 12%, rgba(255,255,255,0.35), transparent),
            radial-gradient(1px 1px at 72% 8%, rgba(255,255,255,0.25), transparent),
            radial-gradient(1px 1px at 88% 42%, rgba(255,255,255,0.3), transparent),
            radial-gradient(1px 1px at 34% 78%, rgba(255,255,255,0.22), transparent),
            radial-gradient(1px 1px at 56% 22%, rgba(255,255,255,0.2), transparent),
            radial-gradient(1px 1px at 18% 56%, rgba(255,255,255,0.18), transparent),
            radial-gradient(1px 1px at 92% 88%, rgba(255,255,255,0.24), transparent),
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)
          `,
          backgroundSize:
            '100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 64px 64px, 64px 64px',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"
        aria-hidden
      />

      <div className="relative z-[1] mx-auto w-full max-w-[min(100%,1800px)] px-5 sm:px-8 lg:px-12 xl:px-16">
        <h1 className="sr-only">Roadmap</h1>

        {/* Header */}
        <header className="mb-12 flex flex-col gap-8 lg:mb-16 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 text-left">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-zinc-500">
              [ 04 ]
            </p>
            <motion.div
              className="min-w-0 w-full"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <pre
                className="docs-ascii-headline w-full overflow-x-auto pb-1 text-left font-mono leading-[1.05] tracking-normal text-zinc-50 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [font-size:clamp(0.32rem,0.72vw+0.26rem,0.72rem)] sm:leading-[1.04]"
                style={{ fontFeatureSettings: '"liga" 0' }}
                aria-hidden
              >
                {ROADMAP_TITLE_ASCII}
              </pre>
            </motion.div>
            <p className="mt-3 max-w-md text-sm text-zinc-500 sm:text-base">
              The future of configuration discipline
            </p>
          </div>
          <div className="flex shrink-0 items-start gap-4 sm:gap-6">
            <div className="text-right font-mono">
              <p className="text-[11px] uppercase tracking-[0.2em] text-sky-400 sm:text-xs">
                SYSTEM ORIGIN
              </p>
              <p className="mt-1 text-sm text-sky-300/90 sm:text-base">v1.0.0</p>
            </div>
            <SystemOriginGraphic />
          </div>
        </header>

        <div className="grid gap-12 lg:grid-cols-[minmax(240px,280px)_1fr] lg:gap-16 xl:gap-20">
          {/* Sidebar */}
          <aside className="space-y-8 font-mono text-xs text-zinc-400 lg:space-y-9">
            <div className="border border-zinc-800/90 bg-zinc-950/50 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/40 opacity-75 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
                  EVOLVING
                </span>
              </div>
            </div>

            <div className="relative border border-zinc-800/80 bg-black/40 p-4">
              <span className="absolute left-2 top-2 h-2 w-2 border-l border-t border-zinc-600" />
              <span className="absolute right-2 top-2 h-2 w-2 border-r border-t border-zinc-600" />
              <span className="absolute bottom-2 left-2 h-2 w-2 border-b border-l border-zinc-600" />
              <span className="absolute bottom-2 right-2 h-2 w-2 border-b border-r border-zinc-600" />
              <pre className="mx-auto max-w-[12rem] whitespace-pre text-[10px] leading-snug text-zinc-500 sm:text-[11px]">
                {SIDEBAR_ASCII}
              </pre>
            </div>

            <div>
              <p className="font-sans text-4xl font-semibold tracking-tight text-white">
                42%
              </p>
              <p className="mb-3 mt-1 text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                Roadmap progress
              </p>
              <div className="flex gap-1">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-sm ${
                      i < 4 ? 'bg-emerald-500' : 'bg-zinc-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="relative px-3 py-3">
              <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-zinc-600" />
              <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-zinc-600" />
              <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-zinc-600" />
              <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-zinc-600" />
              <p className="text-[11px] leading-relaxed text-zinc-500">
                <span className="font-semibold uppercase tracking-wider text-zinc-400">
                  Tip:
                </span>{' '}
                Great systems aren&apos;t built in a day. They&apos;re versioned,
                validated, and evolved.
              </p>
            </div>

            <div className="space-y-2.5 border-t border-zinc-900 pt-6">
              {(
                [
                  ['completed', 'COMPLETED', 'bg-emerald-400'],
                  ['in-progress', 'IN PROGRESS', 'bg-sky-400'],
                  ['planned', 'PLANNED', 'bg-zinc-500'],
                  ['future', 'FUTURE', 'bg-zinc-800'],
                ] as const
              ).map(([key, label, dot]) => (
                <div key={key} className="flex items-center gap-2.5 text-[11px] uppercase tracking-wider">
                  <span className={`h-2 w-2 shrink-0 rounded-full ${dot}`} />
                  <span className="text-zinc-500">{label}</span>
                </div>
              ))}
            </div>

            <p className="border-t border-zinc-900 pt-6 text-[10px] uppercase tracking-[0.2em] text-zinc-600">
              LAST UPDATED{' '}
              <span className="inline-flex items-center gap-1.5 text-zinc-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                May 21, 2026
              </span>
            </p>
          </aside>

          {/* Timeline + cards */}
          <div className="relative min-w-0">
            <svg
              className="pointer-events-none absolute left-0 top-6 hidden h-[calc(100%-3rem)] w-12 overflow-visible sm:block"
              viewBox="0 0 48 1200"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M 24 0 C 4 180 44 360 24 540 C 6 720 42 900 24 1080 C 8 1260 40 1440 24 1620 C 6 1800 44 1980 24 2160"
                fill="none"
                stroke="rgba(63,63,70,0.85)"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <div
              className="absolute left-6 top-6 block h-[calc(100%-3rem)] w-px -translate-x-1/2 bg-zinc-800 sm:hidden"
              aria-hidden
            />

            <ul className="relative space-y-10 sm:space-y-12">
              {ROADMAP_ITEMS.map((item, index) => (
                <li key={item.id} className="grid grid-cols-[48px_1fr] gap-4 sm:grid-cols-[56px_1fr] sm:gap-6">
                  <div className="relative flex justify-center pt-1 sm:pt-2">
                    <TimelineNode status={item.status} />
                  </div>
                  <RoadmapCard item={item} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <footer className="mt-20 flex flex-col items-center text-center sm:mt-24">
          <p className="text-sm text-zinc-500">Have ideas or want to contribute?</p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-full max-w-md items-center justify-center border border-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-accent transition hover:bg-accent/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:text-[13px]"
          >
            Open an issue on GitHub ↗
          </a>
        </footer>
      </div>
    </div>
  )
}
