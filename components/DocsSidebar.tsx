'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search } from 'lucide-react'
import { useMemo, useSyncExternalStore, type RefObject } from 'react'
import { DOC_NAV_SECTIONS, type DocsNavLink } from '@/lib/docs-nav'

function isActive(pathname: string | null, href: string): boolean {
  if (!pathname) return false
  const p = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname
  if (href === '/docs') return p === '/docs'
  return p === href || p.startsWith(`${href}/`)
}

function linkMatchesQuery(link: DocsNavLink, q: string): boolean {
  if (!q.trim()) return true
  const n = q.toLowerCase().trim()
  const blob = [link.label, link.href, ...(link.keywords ?? []), link.external ? 'external' : '']
    .join(' ')
    .toLowerCase()
  return blob.includes(n)
}

type Layout = 'sidebar' | 'stacked' | 'navOnly'

function subscribeModKey() {
  return () => {}
}

function getModKeyClient(): '⌘' | 'Ctrl' {
  if (typeof navigator === 'undefined') return 'Ctrl'
  return /Mac|iPhone|iPod|iPad/i.test(navigator.platform) ? '⌘' : 'Ctrl'
}

export default function DocsSidebar({
  query,
  onQueryChange,
  searchInputRef,
  layout,
  hideSearch,
}: {
  query: string
  onQueryChange: (value: string) => void
  searchInputRef: RefObject<HTMLInputElement | null>
  layout: Layout
  hideSearch?: boolean
}) {
  const pathname = usePathname()
  const modKey = useSyncExternalStore(subscribeModKey, getModKeyClient, () => 'Ctrl')

  const filteredSections = useMemo(() => {
    return DOC_NAV_SECTIONS.map((section) => ({
      ...section,
      links: section.links.filter((l) => linkMatchesQuery(l, query)),
    })).filter((s) => s.links.length > 0)
  }, [query])

  const showSearch = !hideSearch && (layout === 'sidebar' || layout === 'stacked')

  const linkClass = (href: string, external?: boolean) => {
    const active = !external && isActive(pathname, href)
    return [
      'relative block rounded-md py-2 pl-3 pr-9 font-mono text-[13px] transition-colors',
      active
        ? 'bg-muted/60 text-foreground before:absolute before:left-0 before:top-1/2 before:h-7 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-accent after:absolute after:right-3 after:top-1/2 after:h-1.5 after:w-1.5 after:-translate-y-1/2 after:rounded-full after:bg-accent dark:bg-white/[0.06]'
        : 'text-muted-foreground hover:bg-muted/40 hover:text-foreground dark:hover:bg-white/[0.04]',
    ].join(' ')
  }

  const navBlock = (
    <nav className="space-y-8" aria-label="Documentation">
      {filteredSections.map((section) => (
        <div key={section.title}>
          <p className="mb-2 px-1 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            {section.title}
          </p>
          <ul className="space-y-0.5">
            {section.links.map((link) => (
              <li key={`${section.title}-${link.label}-${link.href}`}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkClass(link.href, true)} pr-3`}
                  >
                    {link.label}
                    <span className="ml-1 text-[10px] text-muted-foreground/80" aria-hidden>
                      ↗
                    </span>
                  </a>
                ) : (
                  <Link href={link.href} className={linkClass(link.href)}>
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
      {query.trim() && filteredSections.length === 0 && (
        <p className="px-1 font-mono text-xs text-muted-foreground">No topics match &ldquo;{query.trim()}&rdquo;.</p>
      )}
    </nav>
  )

  return (
    <div className={layout === 'sidebar' ? 'flex h-full min-h-0 flex-col gap-6 px-4 py-6' : 'flex flex-col gap-4'}>
      {showSearch && (
        <div className="relative shrink-0">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            strokeWidth={2}
            aria-hidden
          />
          <input
            ref={searchInputRef}
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search docs…"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            className="w-full rounded-lg border border-border/70 bg-surface/80 py-2.5 pl-10 pr-[4.5rem] font-mono text-sm text-foreground placeholder:text-muted-foreground/70 outline-none ring-accent/30 transition focus:border-accent/50 focus:ring-2 dark:border-white/[0.1] dark:bg-black/40"
            aria-label="Search documentation"
          />
          <span className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 font-mono text-[10px] text-muted-foreground/90 sm:flex">
            <kbd className="rounded border border-border/80 bg-muted/50 px-1 py-px dark:border-white/15 dark:bg-white/[0.06]">
              {modKey}
            </kbd>
            <kbd className="rounded border border-border/80 bg-muted/50 px-1 py-px dark:border-white/15 dark:bg-white/[0.06]">
              K
            </kbd>
          </span>
        </div>
      )}

      {layout !== 'stacked' && navBlock}
    </div>
  )
}
