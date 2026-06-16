'use client'

import { useScroll } from 'framer-motion'
import { motion } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-px origin-left bg-accent/22 dark:bg-accent/16"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
