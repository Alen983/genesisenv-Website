interface CodeBlockServerProps {
  code: string
  language?: string
}

export default function CodeBlockServer({ code, language = 'bash' }: CodeBlockServerProps) {
  return (
    <div className="relative group">
      <div className="bg-surface border border-gray-800 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-black/50 border-b border-gray-800">
          <span className="text-xs text-gray-500 font-mono">{language}</span>
        </div>
        <pre className="p-4 overflow-x-auto">
          <code className="font-mono text-sm text-gray-300">{code}</code>
        </pre>
      </div>
    </div>
  )
}
