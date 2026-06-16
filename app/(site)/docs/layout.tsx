import type { ReactNode } from 'react'
import DocsShell from '@/components/DocsShell'

/** Docs: sidebar + search; navbar/footer come from parent `(site)` layout. */
export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full min-w-0">
      <DocsShell>{children}</DocsShell>
    </div>
  )
}
