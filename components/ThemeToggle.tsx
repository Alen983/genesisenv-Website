'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const btnClass =
  'flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border/60 text-muted-foreground transition-colors hover:border-border hover:bg-muted/40 hover:text-foreground md:h-10 md:w-10'

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMounted(true)
    })
    return () => cancelAnimationFrame(id)
  }, [])

  if (!mounted) {
    return <span className={`${btnClass} ${className}`} aria-hidden />
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      className={`${btnClass} ${className}`}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="h-[18px] w-[18px] md:h-5 md:w-5" strokeWidth={1.75} aria-hidden />
      ) : (
        <Moon className="h-[18px] w-[18px] md:h-5 md:w-5" strokeWidth={1.75} aria-hidden />
      )}
    </button>
  )
}
