'use client'

import { motion } from 'framer-motion'

const icons = [
  {
    id: 'terminal',
    symbol: '>_',
    label: 'terminal',
    color: 'accentCyan',
    top: '18%',
    left: '8%',
    delay: 0,
    duration: 4,
  },
  {
    id: 'lock',
    symbol: '🔒',
    label: 'lock',
    color: 'accentGold',
    top: '25%',
    right: '10%',
    left: 'auto',
    delay: 0.8,
    duration: 5,
  },
  {
    id: 'env',
    symbol: '.env',
    label: 'env file',
    color: 'accentCyan',
    bottom: '22%',
    left: '12%',
    top: 'auto',
    delay: 0.4,
    duration: 4.5,
  },
]

export default function HeroFloatingIcons() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {icons.map((icon) => (
        <motion.div
          key={icon.id}
          className={`absolute font-mono text-sm font-bold rounded-xl border-2 shadow-lg px-2 py-1 ${
            icon.color === 'accentCyan'
              ? 'border-accentCyan/60 bg-accentCyan/10 text-accentCyan'
              : 'border-accentGold/60 bg-accentGold/10 text-accentGold'
          }`}
          style={{
            top: icon.top,
            left: icon.left,
            right: icon.right,
            bottom: icon.bottom,
          }}
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: icon.duration,
            delay: icon.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {icon.symbol}
        </motion.div>
      ))}
    </div>
  )
}
