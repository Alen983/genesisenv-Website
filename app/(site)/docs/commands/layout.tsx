import type { ReactNode } from 'react'
import DocsArticleLayout from '@/components/DocsArticleLayout'

export default function Layout({ children }: { children: ReactNode }) {
  return <DocsArticleLayout>{children}</DocsArticleLayout>
}
