'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Github, Menu, X } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'
import BrandName from '@/components/BrandName'
import { GITHUB_REPO_URL } from '@/lib/site'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/docs', label: 'Docs' },
  { href: '/playground', label: 'Playground' },
  { href: '/roadmap', label: 'Roadmap' },
] as const

const overlayEase = [0.22, 1, 0.36, 1] as const
const backdropTransition = { duration: 0.28, ease: overlayEase }
const panelTransition = { duration: 0.36, ease: overlayEase }

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const reduceMotion = useReducedMotion()
  const sheetId = useId()

  const close = useCallback(() => setMenuOpen(false), [])
  const open = useCallback(() => setMenuOpen(true), [])

  useEffect(() => {
    // Close overlay when the route changes (e.g. browser back) without tying menu state to pathname in render.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: sync open sheet to external URL
    close()
  }, [pathname, close])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [menuOpen, close])

  const tBackdrop = reduceMotion ? { duration: 0.12 } : backdropTransition
  const tPanel = reduceMotion ? { duration: 0.12 } : panelTransition

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-border/40 bg-background/55 font-mono backdrop-blur-md dark:border-white/[0.06] dark:bg-black/55">
        <div className="mx-auto max-w-[1720px] px-4 sm:px-8 lg:px-12">
          {/* Mobile: brand centered, actions on the right */}
          <div className="relative flex h-14 items-center justify-center md:hidden">
            <Link
              href="/"
              className="min-w-0 transition-opacity hover:opacity-90"
              onClick={close}
            >
              <BrandName className="text-[15px]" />
            </Link>
            <div className="absolute right-0 flex shrink-0 items-center gap-1.5">
              <ThemeToggle />
              <button
                type="button"
                onClick={open}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border/70 text-muted-foreground transition-colors hover:border-border hover:bg-muted/50 hover:text-foreground dark:border-white/[0.12] dark:text-zinc-200 dark:hover:border-white/25 dark:hover:bg-white/[0.06] dark:hover:text-white"
                aria-expanded={menuOpen}
                aria-controls={sheetId}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </button>
            </div>
          </div>

          {/* Desktop: logo left, nav centered in viewport, utilities right */}
          <div className="hidden h-14 w-full grid-cols-[1fr_auto_1fr] items-center gap-4 md:grid lg:gap-8">
            <div className="flex min-w-0 justify-self-start">
              <Link
                href="/"
                className="shrink-0 py-1 transition-opacity hover:opacity-90"
                aria-label="Genesis-env home"
              >
                <BrandName className="text-sm sm:text-base" />
              </Link>
            </div>

            <nav
              className="flex min-w-0 flex-wrap items-center justify-center justify-self-center gap-x-2 gap-y-1 lg:gap-x-4"
              aria-label="Main"
            >
              {navLinks.map((item) => {
                const isActive =
                  pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`shrink-0 whitespace-nowrap px-2 py-1 text-xs font-normal uppercase tracking-[0.22em] transition-colors sm:px-2.5 ${
                      isActive
                        ? 'border-b border-foreground text-foreground dark:border-white/80'
                        : 'border-b border-transparent text-muted-foreground hover:text-foreground/80 dark:hover:text-zinc-300'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            <div className="flex shrink-0 items-center justify-self-end gap-2">
              <ThemeToggle />
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex shrink-0 items-center gap-2 px-2 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground dark:text-white/[0.52] dark:hover:text-white/90"
                aria-label="Open GitHub repository"
              >
                <Github size={14} className="opacity-80" />
                <span className="hidden lg:inline">GitHub</span>
                <span className="text-accent/90" aria-hidden>
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile: left sheet + dimmed backdrop — separate from desktop */}
      <AnimatePresence mode="sync">
        {menuOpen && (
          <>
            <motion.div
              key="mobile-nav-backdrop"
              className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-[6px] dark:bg-black/60 md:hidden"
              role="presentation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={tBackdrop}
              onClick={close}
            />
            <motion.aside
              key="mobile-nav-panel"
              id={sheetId}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={tPanel}
              className="fixed left-0 top-0 z-[101] flex h-[100dvh] w-[min(17.5rem,calc(100vw-2rem))] flex-col border-r border-border/80 bg-background/95 font-mono shadow-[16px_0_48px_rgba(0,0,0,0.12)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#070707]/95 dark:shadow-[16px_0_48px_rgba(0,0,0,0.45)] md:hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pointer-events-none absolute inset-0 terminal-grid-bg opacity-[0.09]" aria-hidden />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-foreground/[0.03] via-transparent to-background/40 dark:from-white/[0.03] dark:to-black/40" aria-hidden />

              <div className="relative flex items-center justify-between gap-3 border-b border-border/60 px-4 py-3.5 dark:border-white/[0.06]">
                <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Navigate</p>
                <div className="flex items-center gap-2">
                  <ThemeToggle className="!h-9 !w-9" />
                  <button
                    type="button"
                    onClick={close}
                    className="flex h-9 w-9 items-center justify-center rounded border border-border/70 text-muted-foreground transition-colors hover:border-border hover:bg-muted/40 hover:text-foreground dark:border-white/[0.1] dark:text-zinc-400 dark:hover:border-white/20 dark:hover:bg-white/[0.05] dark:hover:text-white"
                    aria-label="Close menu"
                  >
                    <X className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                  </button>
                </div>
              </div>

              <div className="relative border-b border-border/50 px-4 py-3 dark:border-white/[0.05]">
                <Link
                  href="/"
                  onClick={close}
                  className="block transition-opacity hover:opacity-80"
                >
                  <BrandName className="text-sm" />
                </Link>
              </div>

              <nav className="relative flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-4" aria-label="Main">
                {navLinks.map((item, i) => {
                  const isActive =
                    pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href))
                  return (
                    <motion.div
                      key={item.href}
                      initial={
                        reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                      }
                      animate={{ opacity: 1, x: 0 }}
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { duration: 0.28, ease: overlayEase, delay: 0.04 + i * 0.05 }
                      }
                    >
                      <Link
                        href={item.href}
                        onClick={close}
                        aria-current={isActive ? 'page' : undefined}
                        className={`block border-l-2 py-2.5 pl-3 pr-2 text-xs font-normal uppercase tracking-[0.2em] transition-colors ${
                          isActive
                            ? 'border-accent text-foreground'
                            : 'border-transparent text-muted-foreground hover:border-border hover:bg-muted/30 hover:text-foreground dark:hover:border-white/15 dark:hover:bg-white/[0.03] dark:hover:text-zinc-200'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>

              <motion.div
                initial={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.28, ease: overlayEase, delay: 0.04 + navLinks.length * 0.05 }
                }
                className="relative mt-auto border-t border-border/60 px-4 py-4 dark:border-white/[0.06]"
              >
                <a
                  href={GITHUB_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-accent"
                >
                  <Github size={14} className="opacity-80" aria-hidden />
                  <span>GitHub</span>
                  <span className="text-accent/90" aria-hidden>
                    ↗
                  </span>
                </a>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
