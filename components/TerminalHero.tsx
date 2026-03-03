'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const command = 'genesis-env validate .env.template'
const typingSpeed = 100

export default function TerminalHero() {
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
  }, [])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="bg-surface border border-gray-800 rounded-lg overflow-hidden">
        <div className="flex items-center space-x-2 px-4 py-3 bg-black/50 border-b border-gray-800">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-4 text-xs text-gray-500 font-mono">terminal</span>
        </div>
        <div className="p-6 font-mono text-sm">
          <div className="flex items-center">
            <span className="text-accent">$</span>
            <span className="ml-2 text-gray-300">
              {displayedText}
              {showCursor && <span className="text-accent">▋</span>}
            </span>
          </div>
          {displayedText === command && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
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
