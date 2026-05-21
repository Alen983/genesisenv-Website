'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react'

interface ValidationResult {
  keysFound: number
  missingKeys: string[]
  placeholderValues: string[]
}

export default function PlaygroundEditor() {
  const [template, setTemplate] = useState(`DATABASE_URL=postgresql://user:password@localhost:5432/dbname
API_KEY=your_api_key_here
REDIS_URL=redis://localhost:6379
NODE_ENV=development
PORT=3000
SECRET_KEY=change_me_in_production
DEBUG=true
LOG_LEVEL=info
CORS_ORIGIN=http://localhost:3000
MAX_CONNECTIONS=100
TIMEOUT=30`)

  const [generated, setGenerated] = useState('')
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null)

  const parseEnvTemplate = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim() && !line.trim().startsWith('#'))
    const keys: string[] = []
    const placeholders: string[] = []

    lines.forEach(line => {
      const match = line.match(/^([A-Z_][A-Z0-9_]*)\s*=\s*(.+)$/i)
      if (match) {
        const key = match[1]
        const value = match[2].trim()
        keys.push(key)
        
        if (value.includes('your_') || value.includes('change_me') || 
            value.includes('localhost') || value === 'development' ||
            value.match(/^[a-z_]+$/i) && value.length < 10) {
          placeholders.push(key)
        }
      }
    })

    return { keys, placeholders }
  }

  const handleValidate = () => {
    const { keys, placeholders } = parseEnvTemplate(template)
    
    // Simulate generating .env from template
    const generatedLines = template.split('\n').map(line => {
      if (line.trim() && !line.trim().startsWith('#')) {
        const match = line.match(/^([A-Z_][A-Z0-9_]*)\s*=\s*(.+)$/i)
        if (match) {
          const key = match[1]
          const value = match[2].trim()
          // In real scenario, this would be replaced with actual values
          return `${key}=${value}`
        }
      }
      return line
    })
    setGenerated(generatedLines.join('\n'))

    // Validation logic
    const requiredKeys = ['DATABASE_URL', 'API_KEY', 'SECRET_KEY']
    const missingKeys = requiredKeys.filter(key => !keys.includes(key))

    setValidationResult({
      keysFound: keys.length,
      missingKeys,
      placeholderValues: placeholders,
    })
  }

  return (
    <div className="w-full">
      <div className="mb-6 grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left: Template Editor */}
        <div className="flex min-w-0 flex-col">
          <label className="text-sm font-semibold mb-2 text-gray-300">
            .env.template
          </label>
          <textarea
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="min-h-[12rem] flex-1 resize-none rounded-lg border border-gray-800 bg-surface p-3 font-mono text-xs text-gray-300 focus:border-accent focus:outline-none sm:min-h-[16rem] sm:p-4 sm:text-sm"
            placeholder="Enter your .env.template content..."
          />
        </div>

        {/* Right: Generated .env */}
        <div className="flex min-w-0 flex-col">
          <label className="text-sm font-semibold mb-2 text-gray-300">
            Generated .env
          </label>
          <div className="min-h-[12rem] flex-1 overflow-auto rounded-lg border border-gray-800 bg-surface p-3 font-mono text-xs text-gray-400 sm:min-h-[16rem] sm:p-4 sm:text-sm">
            {generated || (
              <span className="text-gray-600">Generated output will appear here...</span>
            )}
          </div>
        </div>
      </div>

      {/* Validate Button */}
      <div className="mb-6 flex justify-start">
        <motion.button
          onClick={handleValidate}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-3.5 rounded-full bg-gray-100 text-background font-semibold hover:bg-white transition-all duration-150 hover:scale-[1.02] hover:shadow-lg"
        >
          Validate
        </motion.button>
      </div>

      {/* Validation Results */}
      {validationResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="min-w-0 space-y-4 rounded-lg border border-gray-800 bg-surface p-6"
        >
          <div className="flex items-center space-x-2 text-green-400">
            <CheckCircle2 size={20} />
            <span className="font-semibold">
              {validationResult.keysFound} keys found
            </span>
          </div>

          {validationResult.missingKeys.length > 0 && (
            <div className="flex items-start space-x-2 text-red-400">
              <XCircle size={20} className="mt-0.5" />
              <div>
                <span className="font-semibold">
                  {validationResult.missingKeys.length} missing key{validationResult.missingKeys.length > 1 ? 's' : ''}:
                </span>
                <ul className="list-disc list-inside mt-1 ml-4">
                  {validationResult.missingKeys.map((key) => (
                    <li key={key} className="font-mono">{key}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {validationResult.placeholderValues.length > 0 && (
            <div className="flex items-start space-x-2 text-yellow-400">
              <AlertTriangle size={20} className="mt-0.5" />
              <div>
                <span className="font-semibold">
                  {validationResult.placeholderValues.length} placeholder value{validationResult.placeholderValues.length > 1 ? 's' : ''} detected
                </span>
                <ul className="list-disc list-inside mt-1 ml-4">
                  {validationResult.placeholderValues.slice(0, 5).map((key) => (
                    <li key={key} className="font-mono">{key}</li>
                  ))}
                  {validationResult.placeholderValues.length > 5 && (
                    <li className="text-gray-500">
                      ...and {validationResult.placeholderValues.length - 5} more
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
