'use client'

import { useScroll } from 'framer-motion'
import { motion } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <div
      className="fixed left-0 right-0 top-0 z-50 h-0.5 bg-muted/60"
      aria-hidden
    >
      <motion.div
        className="h-full bg-accentCyan/80 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  )
}
