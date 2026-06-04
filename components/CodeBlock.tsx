'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CodeBlockProps {
  code: string
  language?: string
}

export default function CodeBlock({ code, language = 'bash' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <div className="bg-surface border border-border/70 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-muted/40 border-b border-border/70 dark:bg-black/50">
          <span className="text-xs text-muted-foreground font-mono">{language}</span>
          <button
            onClick={handleCopy}
            className="flex items-center space-x-2 text-xs text-muted-foreground hover:text-accent transition-colors"
          >
            {copied ? (
              <>
                <Check size={14} />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <pre className="p-4 overflow-x-auto">
          <code className="font-mono text-sm text-foreground/90">{code}</code>
        </pre>
      </div>
    </div>
  )
}
