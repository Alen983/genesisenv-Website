'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import DocsTerminalHeader from '@/components/DocsTerminalHeader'

const docSections = [
  {
    title: 'Installation',
    href: '/docs/installation',
    description: 'npm i, npx, optional global install, and verify from project root',
  },
  {
    title: 'Commands',
    href: '/docs/commands',
    description: 'init, generate (default), and --force / -f',
  },
  {
    title: 'Templates & .env',
    href: '/docs/validation',
    description: 'Template files, defaults, generate behavior, and quick examples',
  },
  {
    title: 'Teams & onboarding',
    href: '/docs/corporate-systems',
    description: 'Shared templates, contributor flow, and honest CI notes',
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
          <DocsTerminalHeader />
          <p className="text-lg text-gray-400 mt-2">
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
          <h2 className="text-xl font-semibold mb-2">Quick start</h2>
          <p className="text-gray-400 mb-4">
            Install (or use <code className="text-accent">npx</code> without installing), then follow the command reference for <code className="text-accent">init</code> and <code className="text-accent">generate</code>. Template rules and examples live under Templates &amp; <code className="text-accent">.env</code>.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/docs/installation"
              className="text-accent hover:underline inline-flex items-center space-x-1"
            >
              <span>Installation</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/docs/commands"
              className="text-accent hover:underline inline-flex items-center space-x-1"
            >
              <span>Commands</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
