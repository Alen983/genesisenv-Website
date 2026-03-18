'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const DEFAULT_COMMAND = 'genesis-env validate .env.template'
const typingSpeed = 80

type AccentVariant = 'gold' | 'cyan' | 'green'

const accentClasses: Record<AccentVariant, string> = {
  gold: 'text-accentGold',
  cyan: 'text-accentCyan',
  green: 'text-accent',
}

export default function TerminalHero({
  command = DEFAULT_COMMAND,
  highlightKeyword = 'validate',
  accentVariant = 'green',
  compact = false,
}: {
  command?: string
  highlightKeyword?: string
  accentVariant?: AccentVariant
  /** Smaller padding and text for use inside headline or tight layouts */
  compact?: boolean
}) {
  const [displayedText, setDisplayedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex < command.length) {
        setDisplayedText(command.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, typingSpeed)

    return () => clearInterval(interval)
  }, [command])

  useEffect(() => {
    const cursorInterval = setInterval(() => setShowCursor((prev) => !prev), 530)
    return () => clearInterval(cursorInterval)
  }, [])

  const accentClass = accentClasses[accentVariant]

  function renderLine(text: string) {
    if (!highlightKeyword || !text.includes(highlightKeyword)) {
      return <span className="text-gray-300">{text}</span>
    }
    const idx = text.indexOf(highlightKeyword)
    const before = text.slice(0, idx)
    const keyword = text.slice(idx, idx + highlightKeyword.length)
    const after = text.slice(idx + highlightKeyword.length)
    return (
      <span className="text-gray-300">
        {before}
        <span className={accentClass}>{keyword}</span>
        {after}
      </span>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={compact ? 'w-full max-w-md' : 'w-full max-w-3xl mx-auto'}
    >
      <div
        className={
          compact
            ? 'bg-surface/95 border border-gray-600/60 rounded-lg overflow-hidden shadow-xl shadow-black/40 backdrop-blur-sm'
            : 'bg-surface/90 border border-gray-700/50 rounded-xl overflow-hidden shadow-2xl shadow-black/30 backdrop-blur-sm'
        }
      >
        <div
          className={
            compact
              ? 'flex items-center space-x-2 px-2 py-1.5 bg-black/50 border-b border-gray-700/50'
              : 'flex items-center space-x-2 px-4 py-3 bg-black/50 border-b border-gray-700/50'
          }
        >
          <div className={`rounded-full bg-red-500 ${compact ? 'w-2 h-2' : 'w-3 h-3'}`} />
          <div className={`rounded-full bg-yellow-500 ${compact ? 'w-2 h-2' : 'w-3 h-3'}`} />
          <div className={`rounded-full bg-green-500 ${compact ? 'w-2 h-2' : 'w-3 h-3'}`} />
          <span className={`text-gray-500 font-mono ${compact ? 'ml-2 text-[10px]' : 'ml-4 text-xs'}`}>terminal</span>
        </div>
        <div className={compact ? 'px-3 py-2 font-mono text-xs' : 'p-6 font-mono text-sm'}>
          <div className="flex items-center">
            <span className={accentClass}>$</span>
            <span className="ml-1.5">
              {renderLine(displayedText)}
              {showCursor && <span className={accentClass}>▋</span>}
            </span>
          </div>
          {!compact && displayedText === command && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 text-green-400"
            >
              ✓ Validation complete. 12 keys found.
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
