import type { ReactNode } from 'react'

/** Readable measure for MDX doc pages only — not the /docs index hero */
export default function DocsArticleLayout({ children }: { children: ReactNode }) {
  return (
    <div className="docs-mdx docs-article-layout mx-auto w-full min-w-0 max-w-4xl overflow-x-auto px-4 pb-20 pt-24 sm:px-6 lg:px-8">
      {children}
    </div>
  )
}
