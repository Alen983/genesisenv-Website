'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import BrandName from '@/components/BrandName'
import { GITHUB_ISSUES_URL } from '@/lib/site'
import { ROADMAP_PHOENIX_ASCII } from '@/data/roadmapPhoenixAscii'

/** Ship checklist: only items that are actually done vs still open (no speculative “future product” cards). */
type RoadmapStatus = 'completed' | 'todo'

const ROADMAP_ITEMS: {
  id: string
  title: string
  description: ReactNode
  status: RoadmapStatus
}[] = [
  {
    id: '01',
    title: 'Core CLI shipped locally',
    description:
      'Done (in repo): init + generate (default), templates, prompts — matches README / source layout.',
    status: 'completed',
  },
  {
    id: '02',
    title: 'README: discoverability',
    description:
      'Done: install, badges, quick start, example, usage — as documented in the repo README.',
    status: 'completed',
  },
  {
    id: '03',
    title: 'Package metadata for npm/GitHub',
    description: 'Done: repository, bugs, PR/discussion URLs, homepage.',
    status: 'completed',
  },
  {
    id: '04',
    title: 'Public docs / marketing site',
    description:
      'Done (external): site at your homepage; keep it in sync with the real CLI commands.',
    status: 'completed',
  },
  {
    id: '05',
    title: 'npm publish: name + account',
    description: (
      <>
        To do: fix E404 — confirm npm whoami, who owns <BrandName className="text-sm" /> on npm, scoped rename or access —
        until this works, installs from npm as documented may not match your package.
      </>
    ),
    status: 'todo',
  },
  {
    id: '06',
    title: 'package.json polish',
    description:
      'To do: fill keywords, author (and optional files / engines) so npm search and trust look complete.',
    status: 'todo',
  },
  {
    id: '07',
    title: 'Publish tarball hygiene',
    description:
      'To do: npm warned about .gitignore as fallback — consider .npmignore or files so only dist + essentials ship (avoid publishing unnecessary src if you don’t want that).',
    status: 'todo',
  },
  {
    id: '08',
    title: 'Tests & CI',
    description:
      'To do: npm test is still a stub; add real tests + CI (e.g. GitHub Actions) before calling it “stable.”',
    status: 'todo',
  },
  {
    id: '09',
    title: 'Roadmap vs product',
    description:
      'To do: docs/ROADMAP.md lists validation, merge, secret managers, etc. Align site, README, and roadmap so users aren’t misled about what the CLI actually does today.',
    status: 'todo',
  },
  {
    id: '10',
    title: 'Post–v1 quality & ecosystem',
    description:
      'To do: changelog/releases, issue templates usage, semver discipline, and v0.2+ themes (progress UI, stricter validation, optional keys, etc.).',
    status: 'todo',
  },
]

const STATUS_LABEL: Record<RoadmapStatus, string> = {
  completed: 'DONE',
  todo: 'TO DO',
}

const DONE_COUNT = ROADMAP_ITEMS.filter((i) => i.status === 'completed').length
const TOTAL_COUNT = ROADMAP_ITEMS.length
const PROGRESS_PCT = Math.round((DONE_COUNT / TOTAL_COUNT) * 100)

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

function SystemOriginGraphic() {
  return (
    <div
      className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28"
      aria-hidden
    >
      <div className="roadmap-orbit-spin pointer-events-none absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full text-accent/35"
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
        <div className="roadmap-core-pulse h-10 w-10 rounded-full bg-accent/25 blur-md" />
        <div className="absolute h-5 w-5 rounded-full bg-accent shadow-[0_0_24px_rgba(0,255,136,0.75),0_0_48px_rgba(0,255,136,0.28)]" />
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
  return (
    <div className="relative z-[1] h-4 w-4 rounded-full border border-border bg-muted shadow-inner dark:border-zinc-600 dark:bg-zinc-900/90" />
  )
}

function RoadmapCard({ item }: { item: (typeof ROADMAP_ITEMS)[number] }) {
  const label = STATUS_LABEL[item.status]
  const labelColor =
    item.status === 'completed' ? 'text-emerald-400' : 'text-muted-foreground'

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-w-0 rounded-lg border border-border/70 bg-card/90 px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm dark:border-zinc-800/90 dark:bg-zinc-950/80 sm:px-6 sm:py-5"
    >
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.14em] sm:text-xs">
        <span className="text-muted-foreground">{item.id}</span>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-right">
          <span className={labelColor}>{label}</span>
        </div>
      </div>
      <h2 className="break-words font-sans text-base font-bold uppercase tracking-wide text-foreground sm:text-lg">
        {item.title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
        {item.description}
      </p>
    </motion.article>
  )
}

export default function RoadmapPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background pb-24 pt-24 text-foreground">
      {/* Starfield + grid — dark only; light mode uses subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 hidden opacity-[0.45] dark:block dark:opacity-[0.55]"
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
        className="pointer-events-none absolute inset-0 block bg-[length:64px_64px] opacity-50 dark:hidden"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(rgba(9,9,11,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(9,9,11,0.06) 1px, transparent 1px)
          `,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-70 dark:from-black dark:via-transparent dark:to-black dark:opacity-80"
        aria-hidden
      />

      <div className="relative z-[1] mx-auto w-full max-w-[min(100%,1800px)] px-5 sm:px-8 lg:px-12 xl:px-16">
        <h1 className="sr-only">Roadmap</h1>

        {/* Header */}
        <header className="mb-12 flex min-w-0 flex-col flex-wrap gap-8 lg:mb-16 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 text-left">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
              [ SHIP · DONE VS TO DO ]
            </p>
            <motion.div
              className="min-w-0 w-full"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <pre
                className="docs-ascii-headline w-full overflow-x-auto pb-1 text-left font-mono leading-[1.05] tracking-normal text-foreground [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [font-size:clamp(0.38rem,1.05vw+0.32rem,0.95rem)] sm:leading-[1.04] dark:text-zinc-50"
                style={{ fontFeatureSettings: '"liga" 0' }}
                aria-hidden
              >
                {ROADMAP_TITLE_ASCII}
              </pre>
            </motion.div>
            <p className="mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
              What&apos;s already shipped (repo + site) vs what&apos;s still open before npm and &quot;stable&quot;
              claims line up.
            </p>
          </div>
          <div className="flex w-full min-w-0 flex-wrap items-start justify-start gap-4 sm:gap-6 lg:w-auto lg:shrink-0 lg:justify-end">
            <div className="text-right font-mono">
              <p className="text-[11px] uppercase tracking-[0.2em] text-accent sm:text-xs">
                SYSTEM ORIGIN
              </p>
              <p className="mt-1 text-sm text-accent/90 sm:text-base">v1.0.0</p>
            </div>
            <SystemOriginGraphic />
          </div>
        </header>

        <div className="grid gap-12 lg:grid-cols-[minmax(268px,22rem)_1fr] lg:gap-16 xl:gap-20">
          {/* Sidebar */}
          <aside className="space-y-8 font-mono text-xs text-muted-foreground lg:space-y-9">
            <div className="border border-border/70 bg-card/60 px-4 py-3 dark:border-zinc-800/90 dark:bg-zinc-950/50">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/40 opacity-75 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
                  SHIP CHECKLIST
                </span>
              </div>
            </div>

            <div className="relative border border-border/70 bg-card/50 p-3 sm:p-4 dark:border-zinc-800/80 dark:bg-black/40">
              <span className="absolute left-2 top-2 h-2 w-2 border-l border-t border-border dark:border-zinc-600" />
              <span className="absolute right-2 top-2 h-2 w-2 border-r border-t border-border dark:border-zinc-600" />
              <span className="absolute bottom-2 left-2 h-2 w-2 border-b border-l border-border dark:border-zinc-600" />
              <span className="absolute bottom-2 right-2 h-2 w-2 border-b border-r border-border dark:border-zinc-600" />
              <div className="max-h-[min(38vh,18rem)] overflow-auto [-webkit-overflow-scrolling:touch]">
                <pre
                  className="roadmap-phoenix-loader mx-auto w-max min-w-0 whitespace-pre pb-0.5 text-left font-mono text-[3.75px] leading-[1.06] tracking-normal text-foreground/90 [font-feature-settings:'liga'_0] sm:text-[4.25px] md:text-[4.5px] dark:text-zinc-200/95"
                  aria-hidden
                >
                  {ROADMAP_PHOENIX_ASCII}
                </pre>
              </div>
            </div>

            <div>
              <p className="font-sans text-4xl font-semibold tracking-tight text-foreground">
                {PROGRESS_PCT}%
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Roadmap progress
              </p>
              <p className="mb-3 mt-0.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/75">
                Done ({DONE_COUNT} / {TOTAL_COUNT})
              </p>
              <div className="flex gap-1">
                {Array.from({ length: TOTAL_COUNT }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-sm ${
                      i < DONE_COUNT ? 'bg-emerald-500' : 'bg-muted dark:bg-zinc-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="relative px-3 py-3">
              <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-border dark:border-zinc-600" />
              <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-border dark:border-zinc-600" />
              <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-border dark:border-zinc-600" />
              <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-border dark:border-zinc-600" />
              <p className="text-[11px] leading-relaxed text-muted-foreground">
                <span className="font-semibold uppercase tracking-wider text-foreground/80">
                  Tip:
                </span>{' '}
                Great systems aren&apos;t built in a day. They&apos;re versioned,
                validated, and evolved.
              </p>
            </div>

            <div className="space-y-2.5 border-t border-border pt-6 dark:border-zinc-900">
              {(
                [
                  ['done', 'DONE', 'bg-emerald-400'],
                  ['todo', 'TO DO', 'bg-zinc-500 dark:bg-zinc-600'],
                ] as const
              ).map(([key, label, dot]) => (
                <div key={key} className="flex items-center gap-2.5 text-[11px] uppercase tracking-wider">
                  <span className={`h-2 w-2 shrink-0 rounded-full ${dot}`} />
                  <span className="text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>

            <p className="border-t border-border pt-6 text-[10px] uppercase tracking-[0.2em] text-muted-foreground dark:border-zinc-900">
              LAST UPDATED{' '}
              <span className="inline-flex items-center gap-1.5 text-muted-foreground/90">
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
              className="absolute left-6 top-6 block h-[calc(100%-3rem)] w-px -translate-x-1/2 bg-border dark:bg-zinc-800 sm:hidden"
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
          <p className="text-sm text-muted-foreground">Have ideas or want to contribute?</p>
          <a
            href={GITHUB_ISSUES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-full max-w-md items-center justify-center rounded-2xl border border-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-accent transition hover:bg-accent/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:text-[13px]"
          >
            Open an issue on GitHub ↗
          </a>
        </footer>
      </div>
    </div>
  )
}
