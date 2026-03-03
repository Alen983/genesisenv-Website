import type { MDXComponents } from 'mdx/types'
import CodeBlock from './CodeBlock'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-6 mt-8">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mb-4 mt-8">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mb-3 mt-6">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-gray-300">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-300">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="ml-4">{children}</li>
    ),
    code: ({ children, className }) => {
      const isInline = !className
      if (isInline) {
        return (
          <code className="bg-surface px-1.5 py-0.5 rounded text-accent font-mono text-sm">
            {children}
          </code>
        )
      }
      return null // Handled by pre
    },
    pre: ({ children }) => {
      if (children && typeof children === 'object' && 'props' in children) {
        const codeProps = (children as any).props
        const className = codeProps?.className || ''
        const language = className?.replace('language-', '') || 'bash'
        const code = String(codeProps?.children || '').trim()
        return <CodeBlock code={code} language={language} />
      }
      return <pre className="bg-surface border border-gray-800 rounded-lg p-4 overflow-x-auto">{children}</pre>
    },
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-accent hover:underline"
      >
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent pl-4 italic text-gray-400 my-4">
        {children}
      </blockquote>
    ),
    ...components,
  }
}
