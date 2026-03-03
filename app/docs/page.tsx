'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const docSections = [
  {
    title: 'Installation',
    href: '/docs/installation',
    description: 'Get genesis-env up and running in minutes',
  },
  {
    title: 'Commands',
    href: '/docs/commands',
    description: 'Complete command reference and usage examples',
  },
  {
    title: 'Validation',
    href: '/docs/validation',
    description: 'Learn how to validate and enforce environment variable standards',
  },
  {
    title: 'Corporate Systems',
    href: '/docs/corporate-systems',
    description: 'Enterprise integration and team workflows',
  },
]

export default function DocsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Documentation
          </h1>
          <p className="text-lg text-gray-400">
            Everything you need to know about genesis-env
          </p>
        </motion.div>

        <div className="space-y-4">
          {docSections.map((section, index) => (
            <motion.div
              key={section.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={section.href}
                className="block bg-surface border border-gray-800 rounded-lg p-6 hover:border-accent transition-colors group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                      {section.title}
                    </h2>
                    <p className="text-gray-400">{section.description}</p>
                  </div>
                  <ArrowRight 
                    size={20} 
                    className="text-gray-500 group-hover:text-accent group-hover:translate-x-1 transition-all ml-4"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-surface border border-gray-800 rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-2">Quick Start</h2>
          <p className="text-gray-400 mb-4">
            New to genesis-env? Start with the installation guide to get up and running quickly.
          </p>
          <Link
            href="/docs/installation"
            className="text-accent hover:underline inline-flex items-center space-x-1"
          >
            <span>Read Installation Guide</span>
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
