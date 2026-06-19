/**
 * Site-wide motion presets: smooth deceleration + soft springs (animation-only).
 */

/** Cubic-bezier: gentle ease-out, minimal “snap” at the end */
export const EASE_BUTTER = [0.16, 1, 0.3, 1] as const

/** Shared layout (intro wordmark → hero): low bounce, high damping */
export const BRAND_LAYOUT_SPRING = {
  type: 'spring' as const,
  bounce: 0.08,
  stiffness: 200,
  damping: 44,
  mass: 1.08,
}

export function butterTransition(duration: number, delay = 0) {
  return { duration, delay, ease: EASE_BUTTER }
}

/** Tween for Framer `layout` (bounds / size) animations */
export const LAYOUT_BUTTER = { duration: 0.62, ease: EASE_BUTTER }

/** Terminal success panel: height opens smoothly, copy fades in */
export const TERMINAL_EXPAND = {
  height: { duration: 0.68, ease: EASE_BUTTER, delay: 0.22 },
  opacity: { duration: 0.5, ease: EASE_BUTTER, delay: 0.3 },
}

/** Symmetric in-out for long-running / looping motion */
export const EASE_GENTLE_IN_OUT = [0.42, 0.02, 0.58, 0.98] as const

export const TAP_SPRING = {
  type: 'spring' as const,
  stiffness: 240,
  damping: 26,
  mass: 0.92,
}
