import Link from 'next/link'
import { Github } from 'lucide-react'
import { GITHUB_REPO_URL } from '@/lib/site'

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} genesis-env. Configuration discipline.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:justify-end">
            <Link
              href="/docs"
              className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              Documentation
            </Link>
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
