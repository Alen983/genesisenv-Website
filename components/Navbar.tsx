'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Github } from 'lucide-react'

const navLinks = [
  { href: '/docs', label: 'Docs' },
  { href: '/playground', label: 'Playground' },
  { href: '/roadmap', label: 'Roadmap' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-black/55 font-mono backdrop-blur-md">
      <div className="mx-auto max-w-[1720px] px-5 sm:px-8 lg:px-12">
        <div className="flex h-14 items-center justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-6 sm:gap-10">
            <Link
              href="/"
              className="group relative shrink-0 overflow-hidden rounded-sm border border-white/[0.08] bg-black/40 px-2.5 py-1.5 transition-colors hover:border-white/[0.14]"
              aria-label="genesis-env home"
            >
              <div className="pointer-events-none absolute inset-0 terminal-grid-bg opacity-[0.12]" aria-hidden />
              <div className="relative">
                <div className="text-xs font-medium leading-tight text-white sm:text-sm">
                  genesis-env
                </div>
                <div className="mt-0.5 text-[11px] text-zinc-500 sm:text-xs">
                  templates · validate · generate
                </div>
              </div>
            </Link>

            <div className="flex min-w-0 items-center gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-4 [&::-webkit-scrollbar]:hidden">
              {navLinks.map((item) => {
                const isActive =
                  pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href))

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`shrink-0 px-2 py-1 text-xs font-normal uppercase tracking-[0.22em] transition-colors sm:px-2.5 ${
                      isActive
                        ? 'border-b border-white/80 text-white'
                        : 'border-b border-transparent text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-2 px-2 py-1 text-xs uppercase tracking-[0.18em] text-white/[0.52] transition-colors hover:text-white/90 sm:gap-2"
          >
            <Github size={14} className="opacity-80" />
            <span className="hidden sm:inline">GitHub</span>
            <span className="text-docsBlue/90">↗</span>
          </a>
        </div>
      </div>
    </nav>
  )
}
