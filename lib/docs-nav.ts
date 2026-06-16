import { GITHUB_REPO_URL } from '@/lib/site'

export type DocsNavLink = {
  label: string
  href: string
  keywords?: string[]
  external?: boolean
}

export type DocsNavSection = {
  title: string
  links: DocsNavLink[]
}

/** Sidebar + search index — only real routes unless `external` */
export const DOC_NAV_SECTIONS: DocsNavSection[] = [
  {
    title: 'Get started',
    links: [
      { label: 'Overview', href: '/docs', keywords: ['home', 'index', 'introduction'] },
      { label: 'Installation', href: '/docs/installation', keywords: ['npm', 'npx', 'global', 'verify'] },
      {
        label: 'Quick start',
        href: '/docs/commands',
        keywords: ['generate', 'init', 'cli', 'first run', 'defaults'],
      },
    ],
  },
  {
    title: 'Guides',
    links: [
      {
        label: 'Core concepts',
        href: '/docs/validation',
        keywords: ['template', '.env', 'environment', 'validation', 'concepts', 'format'],
      },
      {
        label: 'Commands & generation',
        href: '/docs/commands',
        keywords: ['generate', 'force', 'overwrite', 'flags', 'init', 'npx'],
      },
      {
        label: 'Synchronization & teams',
        href: '/docs/corporate-systems',
        keywords: ['ci', 'contributors', 'shared', 'pipeline', 'onboarding', 'sync'],
      },
    ],
  },
  {
    title: 'Reference',
    links: [
      { label: 'CLI reference', href: '/docs/commands', keywords: ['subcommand', 'options', 'flags'] },
      {
        label: 'Templates & file format',
        href: '/docs/validation',
        keywords: ['variables', 'defaults', 'gitignore', '.env.template'],
      },
      { label: 'Playground', href: '/playground', keywords: ['try', 'browser', 'demo', 'interactive'] },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Roadmap', href: '/roadmap', keywords: ['status', 'ship', 'planned'] },
      { label: 'Changelog', href: `${GITHUB_REPO_URL}/releases`, external: true, keywords: ['releases', 'version'] },
      { label: 'Contributing', href: `${GITHUB_REPO_URL}`, external: true, keywords: ['pull request', 'issues', 'github'] },
      { label: 'Security', href: `${GITHUB_REPO_URL}/security`, external: true, keywords: ['advisory', 'report'] },
      {
        label: 'FAQ',
        href: '/docs/corporate-systems',
        keywords: ['questions', 'teams', 'limitations'],
      },
    ],
  },
]

export type SearchableDocItem = DocsNavLink & { section: string }

export function getSearchableDocItems(): SearchableDocItem[] {
  const out: SearchableDocItem[] = []
  for (const section of DOC_NAV_SECTIONS) {
    for (const link of section.links) {
      out.push({ ...link, section: section.title })
    }
  }
  return out
}
