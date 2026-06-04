import type { MDXComponents } from 'mdx/types'
import CodeBlockServer from './CodeBlockServer'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="mb-6 mt-8 text-4xl font-bold text-foreground">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-8 text-3xl font-bold text-foreground">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-6 text-2xl font-semibold text-foreground">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="mb-4 leading-relaxed text-muted-foreground">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="mb-4 list-inside list-disc space-y-2 text-muted-foreground">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-4 list-inside list-decimal space-y-2 text-muted-foreground">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="ml-4">{children}</li>
    ),
    code: ({ children, className }) => {
      const isInline = !className
      if (isInline) {
        return (
          <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-sm text-accent">
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
        return <CodeBlockServer code={code} language={language} />
      }
      return (
        <pre className="overflow-x-auto rounded-lg border border-border/80 bg-surface p-4">{children}</pre>
      )
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
      <blockquote className="my-4 border-l-4 border-accent pl-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
    ...components,
  }
}
