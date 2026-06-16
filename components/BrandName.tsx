/**
 * Product wordmark: serif italic (Instrument Serif), matches “just works” treatment on dark.
 * Use for the name only — not for CLI tokens (`genesis-env` in code).
 */
export default function BrandName({ className = '' }: { className?: string }) {
  return (
    <span className={`font-display italic font-normal tracking-[-0.02em] text-foreground ${className}`.trim()}>
      Genesis-env
    </span>
  )
}
