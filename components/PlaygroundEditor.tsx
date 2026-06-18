'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'

const INIT_SIMULATION = `$ npx genesis-env init
✔ .env.template created
✔ .env created
✔ .gitignore updated (ignored .env)`

function parseTemplateKeys(text: string): { key: string; defaultVal: string }[] {
  const out: { key: string; defaultVal: string }[] = []
  for (const line of text.split('\n')) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    const m = t.match(/^([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/i)
    if (m) {
      out.push({ key: m[1], defaultVal: m[2].trim() })
    }
  }
  return out
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
  const [log, setLog] = useState('')

  const runInit = useCallback(() => {
    setLog(INIT_SIMULATION)
  }, [])

  const runGenerate = useCallback(() => {
    const keys = parseTemplateKeys(template)
    const lines: string[] = ['$ npx genesis-env generate', '✔ Found .env.template']
    for (const { key, defaultVal } of keys) {
      const hint = defaultVal ? ` (${defaultVal})` : ''
      lines.push(`? ${key}:${hint}`)
    }
    lines.push('✔ .env written successfully.')
    setLog(lines.join('\n'))

    const envBody = keys.map(({ key, defaultVal }) => `${key}=${defaultVal}`).join('\n')
    setGenerated(envBody)
  }, [template])

  return (
    <div className="w-full">
      <div className="mb-6 grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex min-w-0 flex-col">
          <label className="mb-2 text-sm font-semibold text-foreground">.env.template</label>
          <textarea
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="min-h-[12rem] flex-1 resize-none rounded-lg border border-border/80 bg-surface p-3 font-mono text-xs text-foreground/90 focus:border-accent focus:outline-none sm:min-h-[16rem] sm:p-4 sm:text-sm"
            placeholder="Enter your .env.template content..."
            spellCheck={false}
          />
        </div>

        <div className="flex min-w-0 flex-col">
          <label className="mb-2 text-sm font-semibold text-foreground">Generated .env</label>
          <div className="min-h-[12rem] flex-1 overflow-auto rounded-lg border border-border/80 bg-surface p-3 font-mono text-xs text-muted-foreground sm:min-h-[16rem] sm:p-4 sm:text-sm">
            {generated ? (
              <pre className="whitespace-pre-wrap break-words text-foreground/90">{generated}</pre>
            ) : (
              <span className="text-muted-foreground/70">Run generate below to fill this from your template…</span>
            )}
          </div>
        </div>
      </div>

      <p className="mb-3 text-xs text-muted-foreground sm:text-sm">
        Simulated output only. Nothing runs on your machine. Matches the two commands people use today:{' '}
        <code className="text-foreground/85">init</code> then <code className="text-foreground/85">generate</code>.
      </p>

      <div className="mb-4 flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
        <motion.button
          type="button"
          onClick={runInit}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-2xl border border-border/80 bg-surface px-6 py-3 text-left font-mono text-xs font-semibold text-foreground transition hover:border-accent/50 hover:bg-muted/40 sm:text-sm"
        >
          Step 1: <span className="text-accent">npx genesis-env init</span>
        </motion.button>
        <motion.button
          type="button"
          onClick={runGenerate}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-2xl bg-foreground px-6 py-3 text-left font-mono text-xs font-semibold text-background transition hover:bg-foreground/90 dark:bg-gray-100 dark:text-zinc-950 dark:hover:bg-white sm:text-sm"
        >
          Step 2: npx genesis-env generate
        </motion.button>
      </div>

      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Terminal</div>
      <div className="min-h-[10rem] overflow-auto rounded-lg border border-border/80 bg-black/90 p-4 font-mono text-xs leading-relaxed text-accent sm:min-h-[12rem] sm:text-sm dark:bg-black/80">
        {log ? (
          <pre className="whitespace-pre-wrap break-words">{log}</pre>
        ) : (
          <span className="text-zinc-500">Click Step 1 or Step 2 to show sample CLI output…</span>
        )}
      </div>
    </div>
  )
}
