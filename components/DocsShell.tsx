'use client'

import { ChevronDown } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import DocsSidebar from '@/components/DocsSidebar'

export default function DocsShell({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('')
  const mobileSearchRef = useRef<HTMLInputElement>(null)
  const desktopSearchRef = useRef<HTMLInputElement>(null)

  const focusVisibleSearch = useCallback(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(min-width: 1024px)').matches) {
      desktopSearchRef.current?.focus()
      desktopSearchRef.current?.select()
    } else {
      mobileSearchRef.current?.focus()
      mobileSearchRef.current?.select()
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        focusVisibleSearch()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [focusVisibleSearch])

  return (
    <div className="w-full min-w-0 bg-background">
      {/* Hairline under fixed site navbar (h-14) */}
      <div
        className="pointer-events-none fixed left-0 right-0 top-14 z-[45] h-px bg-accent/18 dark:bg-accent/14"
        aria-hidden
      />

      {/* Mobile / tablet: search + browse (site navbar already above) */}
      <div className="sticky top-14 z-30 border-b border-border/50 bg-background/95 backdrop-blur-md lg:hidden dark:border-white/[0.06]">
        <div className="px-3 py-2.5">
          <DocsSidebar
            query={query}
            onQueryChange={setQuery}
            searchInputRef={mobileSearchRef}
            layout="stacked"
          />
        </div>
        <details className="group border-t border-border/40 dark:border-white/[0.06]">
          <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground marker:hidden [&::-webkit-details-marker]:hidden">
            <span>Browse topics</span>
            <ChevronDown
              className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180"
              aria-hidden
            />
          </summary>
          <div className="docs-sidebar-scroll max-h-[min(55vh,22rem)] overflow-y-auto overscroll-contain px-3 pb-3 [-webkit-overflow-scrolling:touch]">
            <DocsSidebar
              query={query}
              onQueryChange={setQuery}
              searchInputRef={mobileSearchRef}
              layout="navOnly"
              hideSearch
            />
          </div>
        </details>
      </div>

      <div className="mx-auto flex w-full max-w-[min(100%,1920px)] min-w-0">
        <aside className="docs-sidebar-scroll sticky top-14 z-20 hidden h-[calc(100dvh-3.5rem)] w-[min(100%,280px)] shrink-0 overflow-y-auto overflow-x-hidden border-r border-border/60 bg-background/95 backdrop-blur-sm dark:border-white/[0.06] lg:block">
          <DocsSidebar
            query={query}
            onQueryChange={setQuery}
            searchInputRef={desktopSearchRef}
            layout="sidebar"
          />
        </aside>
        <div className="min-w-0 flex-1 overflow-x-hidden pt-0 lg:pt-16">{children}</div>
      </div>
    </div>
  )
}
