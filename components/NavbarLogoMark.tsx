/**
 * Circular nav mark — light disc + dark curves (matches favicon / tab treatment).
 */
export default function NavbarLogoMark({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={`shrink-0 rounded-full ${className}`.trim()}
      aria-hidden
    >
      <circle cx="16" cy="16" r="15" className="fill-zinc-200 dark:fill-zinc-500" />
      <path
        d="M9.5 12.5Q16 8 22.5 12.5"
        fill="none"
        strokeLinecap="round"
        strokeWidth={2.35}
        className="stroke-zinc-900 dark:stroke-zinc-950"
      />
      <path
        d="M22.5 19.5Q16 24 9.5 19.5"
        fill="none"
        strokeLinecap="round"
        strokeWidth={2.35}
        className="stroke-zinc-900 dark:stroke-zinc-950"
      />
    </svg>
  )
}
