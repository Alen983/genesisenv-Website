'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    title: '.env.template Creation',
    description: 'Define a single source of truth. One template, committed to git, that describes every variable your app needs.',
    snippet: '# .env.template\nDATABASE_URL=\nAPI_KEY=',
  },
  {
    title: 'Validation',
    description: 'Ensure every required key is present and valid before your app runs. No more missing vars in production.',
    snippet: 'genesis-env validate .env.template',
  },
  {
    title: 'Generation',
    description: 'Generate local .env files from the template. Developers get the right structure without guesswork.',
    snippet: 'genesis-env generate .env.template',
  },
  {
    title: 'CI/CD Integration',
    description: 'Run validation in your pipeline. Fail the build when the template is out of sync or invalid.',
    snippet: 'run: genesis-env validate --strict',
  },
]

function StepCard({
  step,
  index,
}: {
  step: (typeof steps)[number]
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      className="relative flex items-start gap-6"
    >
      <div className="flex shrink-0 flex-col items-center pt-2">
        <div className="h-4 w-4 rounded-full border-2 border-accentCyan/60 bg-background" />
        {index < steps.length - 1 && (
          <div className="mt-1 w-0.5 h-16 bg-gradient-to-b from-accentCyan/40 to-transparent" />
        )}
      </div>
      <motion.div
        className="w-full max-w-lg rounded-2xl border border-white/10 bg-gray-900/40 backdrop-blur-md p-8 shadow-xl pb-12"
        whileHover={{
          y: -4,
          boxShadow: '0 20px 40px -15px rgba(34, 211, 238, 0.15), 0 0 0 1px rgba(255,255,255,0.05)',
          transition: { duration: 0.2 },
        }}
      >
        <div className="text-accentCyan font-mono text-sm font-semibold mb-2">
          Step {index + 1}
        </div>
        <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
        <p className="text-gray-400 mb-6 leading-relaxed">{step.description}</p>
        <div className="rounded-lg bg-black/40 border border-gray-700/50 p-4 font-mono text-sm text-gray-300 overflow-x-auto">
          <pre className="whitespace-pre-wrap">{step.snippet}</pre>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function HowItWorksTimeline() {
  return (
    <section className="relative bg-background">
      <div className="py-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">How it works</h2>
        <p className="text-gray-500 mt-2 max-w-xl mx-auto">
          Four steps from template to production
        </p>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {steps.map((step, index) => (
          <StepCard key={step.title} step={step} index={index} />
        ))}
      </div>
    </section>
  )
}
