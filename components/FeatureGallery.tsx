'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const features = [
  {
    title: 'Validate .env files',
    description: 'Catch missing or invalid environment variables before deployment. No more runtime surprises.',
    icon: '✓',
    backSnippet: 'genesis-env validate .env.template --strict',
  },
  {
    title: 'CI/CD ready',
    description: 'Integrate validation into your pipeline. Fail fast, deploy safely.',
    icon: '⚡',
    backSnippet: '- run: genesis-env validate',
  },
  {
    title: 'Placeholder detection',
    description: 'Detect placeholder or example values so secrets never slip through.',
    icon: '🔍',
    backSnippet: 'Detects FIXME, TODO, example values',
  },
  {
    title: 'Key presence checks',
    description: 'Ensure every required key exists and is set. Enforce schema at the door.',
    icon: '🔑',
    backSnippet: '--required DATABASE_URL,API_KEY',
  },
]

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[number]
  index: number
}) {
  const [flipped, setFlipped] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      className="h-64"
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="relative h-full w-full cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
        onClick={() => setFlipped((f) => !f)}
        whileHover={{ scale: 1.02 }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur-md p-6 shadow-inner"
          style={{
            backfaceVisibility: 'hidden',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 4px 20px rgba(0,0,0,0.3)',
          }}
          animate={{
            rotateY: flipped ? -180 : 0,
            boxShadow: flipped
              ? 'inset 0 1px 0 rgba(255,255,255,0.03), 0 0 0 1px rgba(34, 211, 238, 0.2)'
              : 'inset 0 1px 0 rgba(255,255,255,0.03), 0 4px 20px rgba(0,0,0,0.3)',
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-3xl mb-4 text-accentCyan">{feature.icon}</div>
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
          <p className="text-gray-500 text-xs mt-4">Hover or click to reveal</p>
        </motion.div>
        <motion.div
          className="absolute inset-0 rounded-2xl border border-accentCyan/30 bg-gray-900/80 backdrop-blur-md p-6 flex items-center justify-center"
          style={{
            backfaceVisibility: 'hidden',
            rotateY: 180,
          }}
          animate={{ rotateY: flipped ? 0 : 180 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <pre className="font-mono text-sm text-gray-300 whitespace-pre-wrap text-center">
            {feature.backSnippet}
          </pre>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function FeatureGallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Feature gallery
        </h2>
        <p className="text-gray-500 text-center mb-16 max-w-xl mx-auto">
          Explore what genesis-env can do — like exhibits in a museum
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
