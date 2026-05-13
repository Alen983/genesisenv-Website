import type { ReactNode } from 'react'

/** Prose + readable measure for MDX doc pages only — not the /docs index hero */
export default function DocsArticleLayout({ children }: { children: ReactNode }) {
  return (
    <div className="docs-mdx prose prose-invert max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 prose-headings:text-white prose-p:text-gray-300 prose-a:text-accent prose-code:text-accent">
      {children}
    </div>
  )
}
