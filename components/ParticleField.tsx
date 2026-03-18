'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'

const SYMBOLS = ['{', '}', '=', '.', 'env', 'KEY']
const COUNT = 32

function random(min: number, max: number) {
  return min + Math.random() * (max - min)
}

export default function ParticleField() {
  const particles = useMemo(() => {
    return Array.from({ length: COUNT }, (_, i) => ({
      id: i,
      symbol: SYMBOLS[i % SYMBOLS.length],
      x: random(0, 100),
      y: random(0, 100),
      delay: random(0, 4),
      duration: random(8, 16),
      size: random(10, 18),
      opacity: random(0.08, 0.2),
    }))
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute font-mono text-gray-500"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -15, 0],
            x: [0, 5, 0],
            opacity: [p.opacity, p.opacity * 0.5, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {p.symbol}
        </motion.span>
      ))}
    </div>
  )
}
