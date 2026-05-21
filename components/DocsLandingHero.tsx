'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { animate, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const STATUS_LOG_LINES = [
  'TRAINING.STARTED .......... EPOCH 001',
  'EPOCH 002 avg ............. 1.62e-05',
  'EPOCH 003 stream .......... OK',
  'EPOCH 004 error ........... 6.41e-08',
  'TRAINING.FINISHED ......... checksum 0x7A3F',
] as const

const LOAD_SEQUENCE_MS = 3600

/** Phoenix “draw” runs from this progress % through 100%. */
const PHOENIX_BUILD_START_PROGRESS = 48

const DOC_SECTION_LINKS = [
  { href: '/docs/installation', label: 'Getting started', key: 'install' },
  { href: '/docs/commands', label: 'Guides', key: 'guides' },
  { href: '/docs/validation', label: 'API reference', key: 'api' },
  { href: '/playground', label: 'Examples', key: 'examples' },
  { href: '/docs/corporate-systems', label: 'Resources', key: 'resources' },
] as const

/** Unicode block phoenix — decorative */
const PHOENIX_ART = `⢠⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠈⠙⠶⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠓
⠀⠀⠀⠈⠙⠲⢤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡼⠉⠀
⠀⠀⠛⠤⣠⡀⠀⠀⠉⠑⠳⠤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡴⠋⣁⡴⠃
⠀⠀⠀⠀⠀⠈⠉⠀⠀⠀⠀⢀⠈⠙⢄⡀⠀⠀⢸⠀⠀⠀⠀⠀⠀⣠⠤⠤⣤⠤⠀⠀⠀⠀⢀⡤⡖⠉⠀⠖⠞⠁⢀⠀
⠀⠀⠀⠠⠤⣀⡀⠀⠀⠀⠀⢸⡀⠀⠀⠹⣆⠀⢹⡤⡀⠀⢀⣴⢫⣥⢀⠾⠁⠀⠀⠀⢀⣶⠋⠀⣧⢀⠀⣠⠤⠖⠉⠀
⠀⠀⠀⠀⠀⠉⠑⠒⠆⠀⠀⠸⡇⠀⠀⠀⠹⡦⠈⠓⡥⣄⠈⠉⠘⠋⢸⢀⠀⠀⠀⠀⣸⠉⠀⢠⡻⠈⠀⢋⣀⡤⠀⠀
⠀⠀⠀⠀⠀⠤⣀⣀⡀⠀⠀⠀⢳⠀⠀⠀⠀⠉⢧⣄⠓⢚⣪⡤⠀⠀⠀⢳⡄⠀⠀⣴⠃⠀⢀⣾⠁⠀⠘⠉⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠀⣀⠈⣧⣄⠀⠀⠀⠀⠑⠶⣀⣀⡀⠀⠀⠀⠀⢯⠶⠉⠀⢀⢀⡾⠈⠘⠚⠒⡤⠄⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢤⠒⠊⠉⠁⠀⠈⠱⣄⡄⠀⠀⠀⠀⠀⠈⠁⠀⠀⠀⠀⢸⡆⣠⣠⠶⢫⣀⠋⠒⣴⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠤⠚⠀⡀⠀⠉⠓⠒⠤⠤⠤⠴⠀⠀⠀⠀⠀⢸⡄⠈⠸⢤⠈⠉⢦⡠⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠾⠁⠀⠀⡴⠋⠀⢠⡆⠀⢀⠀⠀⡗⠀⠀⠀⠀⢠⢯⡙⢧⡄⠀⢷⡦⠀⠁⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠾⠃⢀⡴⠋⠀⡰⠏⠀⡞⠎⢰⢄⢀⣰⡟⠈⢲⡄⠹⠓⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠁⠀⠘⠁⢀⠞⠀⠀⢸⡯⡟⠹⡦⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠛⠀⣠⠞⠋⢰⠳⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡼⠉⠀⣼⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡞⡀⠀⢰⡁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⡄⣿⠀⠌⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⠃⡏⠀⢹⠁⠀⢠⠶⠓⢧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡆⢹⠀⠀⢧⡀⡀⠀⢀⡼⠂⢀⠀⠀⠀⡴⠛⠉⠉⢦⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣌⢧⣄⣰⠮⣩⠍⠉⠀⣠⠞⠂⠀⠀⢫⣤⣠⠀⣸⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠱⡎⠛⣷⣝⠶⢏⣩⣍⣁⣠⠀⠀⠀⠀⠀⠀⢠⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢳⠀⠙⢻⣦⡈⠿⣍⣍⡉⠀⠀⠀⠀⣀⡠⠎⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢧⠀⠀⠉⢫⣄⠈⠳⣈⠉⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠹⡆⠀⠹⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠂⠀⠀⠀⠀⣹⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`

const DOC_ASCII_LINES = [
  '  ___   ___   ___ _   _ __  __ ___ _  _ _____ _ _____ ___ ___  _  _ ',
  ' |   \\ / _ \\ / __| | | |  \\/  | __| \\| |_   _/_\\_   _|_ _/ _ \\| \\| |',
  ' | |) | (_) | (__| |_| | |\\/| | _|| .` | | |/ _ \\| |  | | (_) | .` |',
  ' |___/ \\___/ \\___|\\___/|_|  |_|___|_|\\_| |_/_/ \\_\\_| |___\\___/|_|\\_|',
] as const

const DOC_ASCII = DOC_ASCII_LINES.join('\n')

function DocsAsciiHeadline() {
  const outerRef = useRef<HTMLDivElement>(null)
  const preRef = useRef<HTMLPreElement>(null)
  const [scale, setScale] = useState(1)
  const [boxH, setBoxH] = useState<number | undefined>(undefined)

  useLayoutEffect(() => {
    const outer = outerRef.current
    const pre = preRef.current
    if (!outer || !pre) return

    const run = () => {
      const avail = outer.clientWidth
      if (avail < 1) return
      const natural = pre.scrollWidth
      if (natural < 1) return
      const next = natural > avail ? (avail - 0.5) / natural : 1
      setScale(next)
      setBoxH(Math.max(1, Math.ceil(pre.offsetHeight * next)))
    }

    run()
    const ro = new ResizeObserver(() => {
      requestAnimationFrame(run)
    })
    ro.observe(outer)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      ref={outerRef}
      className="min-w-0 w-full overflow-hidden pb-1"
      style={boxH !== undefined ? { height: `${boxH}px` } : undefined}
    >
      <div
        className="inline-block will-change-transform"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'left top',
        }}
      >
        <pre
          ref={preRef}
          className="docs-ascii-headline w-max max-w-none whitespace-pre pb-0.5 font-mono text-[1.05rem] leading-[1.05] tracking-normal text-zinc-50 sm:text-[1.125rem] sm:leading-[1.04]"
          style={{ fontFeatureSettings: '"liga" 0' }}
          aria-hidden
        >
          {DOC_ASCII}
        </pre>
      </div>
    </div>
  )
}

/** Tiny looping terminal stream — duplicated block + translateY(-50%) in CSS. */
function LoopingTerminalLog() {
  const reduceMotion = useReducedMotion()

  return (
    <div
      className="relative h-[3rem] overflow-hidden border-y border-white/[0.07] bg-black/30 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] sm:h-[3.25rem]"
      aria-hidden
    >
      <div
        className={`${reduceMotion ? '' : 'docs-terminal-loop-track'} will-change-transform`}
        style={{ fontFeatureSettings: '"liga" 0' }}
      >
        <div className="space-y-px px-0.5 py-px font-mono text-[7.5px] leading-[1.3] text-zinc-500 sm:text-[8.5px]">
          {reduceMotion
            ? STATUS_LOG_LINES.map((line, i) => (
                <div key={i} className="whitespace-nowrap">
                  {line}
                </div>
              ))
            : [0, 1].flatMap((block) =>
                STATUS_LOG_LINES.map((line, i) => (
                  <div key={`${block}-${i}`} className="whitespace-nowrap">
                    {line}
                  </div>
                )),
              )}
        </div>
      </div>
    </div>
  )
}

function DocsStatusSidebar() {
  const reduceMotion = useReducedMotion()
  const [liveProgress, setLiveProgress] = useState(0)
  const progress = reduceMotion ? 100 : liveProgress

  useEffect(() => {
    if (reduceMotion) return
    const ctrl = animate(0, 100, {
      duration: LOAD_SEQUENCE_MS / 1000,
      ease: [0.22, 0.99, 0.36, 1],
      onUpdate: (latest) => setLiveProgress(latest),
    })
    return () => ctrl.stop()
  }, [reduceMotion])

  const phoenixReveal =
    progress <= PHOENIX_BUILD_START_PROGRESS
      ? 0
      : (progress - PHOENIX_BUILD_START_PROGRESS) / (100 - PHOENIX_BUILD_START_PROGRESS)
  const clipTopPct = (1 - phoenixReveal) * 100

  return (
    <aside className="w-full shrink-0 max-w-[300px] sm:max-w-[320px] lg:w-[min(100%,320px)] lg:max-w-[320px]">
      <div
        className="relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.12] bg-[#080808]"
        style={{
          boxShadow:
            'inset 0 0 64px rgba(255,255,255,0.028), inset 0 0 100px rgba(0,0,0,0.68), 0 16px 48px rgba(0,0,0,0.45)',
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-black/45" />
        <div className="pointer-events-none absolute inset-0 terminal-grid-bg opacity-[0.1]" />

        <div className="relative z-[1] flex flex-col p-3.5 sm:p-4">
          <div className="flex max-h-[124px] justify-center overflow-hidden sm:max-h-[148px]" aria-hidden>
            <div
              className="max-h-full w-full overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              style={{
                clipPath: `inset(${clipTopPct}% 0 0 0)`,
                WebkitClipPath: `inset(${clipTopPct}% 0 0 0)`,
              }}
            >
              <pre
                className="mx-auto w-max max-w-none font-mono text-[4.25px] leading-[1.06] text-zinc-300/90 sm:text-[5px] sm:leading-[1.06]"
                style={{ fontFeatureSettings: '"liga" 0' }}
              >
                {PHOENIX_ART}
              </pre>
            </div>
          </div>

          <div className="mt-2">
            <LoopingTerminalLog />
          </div>

          <div className="mt-3 shrink-0 space-y-2 border-t border-white/[0.07] pt-2.5">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-500 sm:text-[11px]">
              <span>progress</span>
              <span className="tabular-nums text-zinc-400">{Math.round(progress)}%</span>
            </div>
            <div className="h-[3px] w-full rounded-full bg-white/[0.08] sm:h-1">
              <div
                className="h-full rounded-full bg-white transition-[width] duration-75 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

function DocsBottomNavBleed({ inline = false }: { inline?: boolean }) {
  const pathname = usePathname()

  const linkClass = (active: boolean) =>
    `shrink-0 pb-0.5 text-[10px] uppercase tracking-[0.12em] transition-colors sm:text-[11px] sm:tracking-[0.14em] ${
      active
        ? 'border-b border-white text-white'
        : 'border-b border-transparent text-zinc-500 hover:border-white/20 hover:text-zinc-300'
    }`

  const navInner = (
    <>
      {DOC_SECTION_LINKS.map((item) => {
        const onSection = pathname === item.href
        const onDocsHome = pathname === '/docs' || pathname === '/docs/'
        const active = onSection || (onDocsHome && item.key === 'install')

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={linkClass(active)}
          >
            {item.label}
          </Link>
        )
      })}
    </>
  )

  if (inline) {
    return (
      <nav
        className="flex w-full max-w-full flex-wrap items-end justify-center gap-x-4 gap-y-1 sm:gap-x-5 lg:w-auto lg:max-w-[min(100%,52rem)] lg:gap-x-6 xl:gap-x-7"
        aria-label="Documentation sections"
      >
        {navInner}
      </nav>
    )
  }

  return (
    <div className="relative mt-5 w-full sm:mt-6 lg:mt-0">
      <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 border-t border-white/[0.08] px-4 pt-3 sm:pt-4">
        <nav
          className="mx-auto flex max-w-[1800px] flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono"
          aria-label="Documentation sections"
        >
          {navInner}
        </nav>
      </div>
    </div>
  )
}

export default function DocsLandingHero() {
  return (
    <section className="relative min-w-0 font-mono text-white">
      <div className="mx-auto flex w-full max-w-[min(100%,1800px)] flex-col">
        <motion.p
          className="mb-6 text-xs uppercase tracking-[0.28em] text-zinc-500 sm:mb-7 sm:text-[13px]"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          [01] OVERVIEW
        </motion.p>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-x-[min(8vw,2.5rem)] xl:gap-x-[min(11vw,4.5rem)] 2xl:gap-x-20">
          <div className="flex min-w-0 flex-1 flex-col">
            <h1 className="sr-only">Documentation</h1>

            <motion.div
              className="min-w-0 w-full"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <DocsAsciiHeadline />
            </motion.div>

            <motion.p
              className="mt-6 max-w-[28rem] text-sm leading-[1.75] tracking-[0.02em] text-zinc-400 sm:mt-7 sm:max-w-[36rem] sm:text-[0.9375rem] sm:leading-[1.8]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
            >
              The genesis-env CLI scaffolds and refreshes environment files from templates—install with npm or{' '}
              <code className="text-zinc-300">npx</code>, run <code className="text-zinc-300">init</code> and{' '}
              <code className="text-zinc-300">generate</code> from your project root, and keep contributors on the same
              baseline without copying secrets by hand.
            </motion.p>
          </div>

          <div className="flex shrink-0 justify-center lg:w-auto lg:justify-end lg:pt-0.5">
            <DocsStatusSidebar />
          </div>
        </div>

        <div className="mt-10 border-t border-white/[0.07] pt-9 sm:mt-11 sm:pt-10 lg:mt-12 lg:pt-11">
          <div className="flex justify-center">
            <DocsBottomNavBleed inline />
          </div>
        </div>
      </div>
    </section>
  )
}
