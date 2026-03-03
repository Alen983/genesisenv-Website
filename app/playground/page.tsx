'use client'

import { motion } from 'framer-motion'
import PlaygroundEditor from '@/components/PlaygroundEditor'

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Playground
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Test genesis-env validation in real-time. Edit the template, click validate, and see instant feedback.
          </p>
        </motion.div>

        <PlaygroundEditor />
      </div>
    </div>
  )
}
