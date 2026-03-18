'use client'

import { useScroll } from 'framer-motion'
import { motion } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <div
      className="fixed top-0 left-0 right-0 h-0.5 bg-gray-800/50 z-50"
      aria-hidden
    >
      <motion.div
        className="h-full bg-accentCyan/80 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  )
}
