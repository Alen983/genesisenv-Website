import type { ReactNode } from 'react'

/** Full-width shell — do not max-width here or the hero grid collapses to a narrow column */
export default function DocsLayout({ children }: { children: ReactNode }) {
  return <div className="w-full min-w-0">{children}</div>
}
