'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

function RoadmapItem({ 
  title, 
  description, 
  status 
}: { 
  title: string
  description: string
  status: 'planned' | 'in-progress' | 'completed'
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const statusColors = {
    planned: 'text-gray-400',
    'in-progress': 'text-accent',
    completed: 'text-green-400',
  }

  const statusLabels = {
    planned: 'Planned',
    'in-progress': 'In Progress',
    completed: 'Completed',
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-surface border border-gray-800 rounded-lg p-6"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-semibold">{title}</h3>
        <span className={`text-sm font-medium ${statusColors[status]}`}>
          {statusLabels[status]}
        </span>
      </div>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  )
}

export default function RoadmapPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Roadmap
          </h1>
          <p className="text-lg text-gray-400">
            The future of configuration discipline
          </p>
        </motion.div>

        <div className="space-y-6">
          <RoadmapItem
            title="CI/CD Integration"
            description="Native plugins for GitHub Actions, GitLab CI, and Jenkins. Validate environment variables in your pipeline automatically."
            status="planned"
          />
          <RoadmapItem
            title="Corporate Systems Integration"
            description="Enterprise features for managing environment variables across teams, with role-based access and audit logs."
            status="planned"
          />
          <RoadmapItem
            title="Validation Engine v2"
            description="Advanced validation rules, custom validators, and support for complex environment variable patterns."
            status="in-progress"
          />
          <RoadmapItem
            title="Configuration Governance"
            description="Policy enforcement, compliance checks, and automated remediation for environment variable violations."
            status="planned"
          />
          <RoadmapItem
            title="Multi-Environment Management"
            description="Manage and validate environment variables across development, staging, and production environments."
            status="planned"
          />
          <RoadmapItem
            title="CLI Enhancements"
            description="Interactive mode, better error messages, and support for environment variable templates with inheritance."
            status="in-progress"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-4">
            Have ideas or want to contribute?
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Open an issue on GitHub →
          </a>
        </motion.div>
      </div>
    </div>
  )
}
