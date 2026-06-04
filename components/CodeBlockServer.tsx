interface CodeBlockServerProps {
  code: string
  language?: string
}

export default function CodeBlockServer({ code, language = 'bash' }: CodeBlockServerProps) {
  return (
    <div className="relative group">
      <div className="bg-surface border border-border/70 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-muted/40 border-b border-border/70 dark:bg-black/50">
          <span className="text-xs text-muted-foreground font-mono">{language}</span>
        </div>
        <pre className="p-4 overflow-x-auto">
          <code className="font-mono text-sm text-foreground/90">{code}</code>
        </pre>
      </div>
    </div>
  )
}
