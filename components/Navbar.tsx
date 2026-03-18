'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Github } from 'lucide-react'

const navItems = [
  { href: '/', label: 'genesis-env' },
  { href: '/docs', label: 'Docs' },
  { href: '/playground', label: 'Playground' },
  { href: '/roadmap', label: 'Roadmap' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== '/' && pathname?.startsWith(item.href))

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-gray-100 text-background'
                      : 'text-gray-400 hover:bg-gray-800/60 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
          
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-4 py-2 text-sm font-medium border-2 border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white transition-all duration-150 flex items-center gap-2"
          >
            <Github size={20} />
            <span className="text-sm font-medium">GitHub</span>
            <span className="text-accent">↗</span>
          </a>
        </div>
      </div>
    </nav>
  )
}
