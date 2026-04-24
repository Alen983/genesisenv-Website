'use client'

import { useEffect, useState } from 'react'

// FIGlet font "small" — pure ASCII (right)
const ART_LINES = [
  '  ___   ___   ___ _   _ __  __ ___ _  _ _____ _ _____ ___ ___  _  _ ',
  ' |   \\ / _ \\ / __| | | |  \\/  | __| \\| |_   _/_\\_   _|_ _/ _ \\| \\| |',
  ' | |) | (_) | (__| |_| | |\\/| | _|| .` | | |/ _ \\| |  | | (_) | .` |',
  ' |___/ \\___/ \\___|\\___/|_|  |_|___|_|\\_| |_/_/ \\_\\_| |___\\___/|_|\\_|',
] as const

const FULL_ART = ART_LINES.join('\n')

// ASCII-only “glitch portrait”: log lines dissolving into dense @/# (left panel)
const GLITCH_PORTRAIT_LINES = [
  'TRAINING_STARTED :: EPOCH_001 err=5.74e-04............................',
  'EPOCH_002 avg-------- 1.62e-05 ////************.......................',
  'EPOCH_003 stream------ OK :: fragments................................',
  'EPOCH_004 ERROR------- 6.41e-08 ::::::**********......................',
  'TRAINING_FINISHED :: checksum OK ::...................................',
  ':::::::::***********++++++++++++++++@@@@@@@@@@........................',
  '...::::::********++++++++++++++++@@@@@@@@@@@@.........................',
  '....:::::*******+++++++++++++++@@@@@@@@@@@@@@@@.......................',
  '.....::::******++++++++++++@@@@@@@@@@@@@@@@@@@@@......................',
  '......:::*****++++++++++@@@@@@@@@@@@@@@@@@@@@@@@......................',
  '.......::****++++++++@@@@@@@@@@@@@@@@@@@@@@@@@@@......................',
  '........:***+++++++@@@@@@@@@@@@@@@@@@@@@@@@@@@@@......................',
  '.........**++++++@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.......................',
  '..........*+++++@@@@@@@@@@@@@##@@@@@@@@@@@@@@@@@......................',
  '...........+++++@@@@@@@@@@@##@@@@@@@@@@@@@@@@@........................',
  '............++++@@@@@@@@@@@##@@@@@@@@@@@@@@@@@........................',
  '.............+++@@@@@@@@@@@##@@@@@@@@@@@@@@@@@........................',
  '..............++@@@@@@@@@@@##@@@@@@@@@@@@@@@@@........................',
  '...............+@@@@@@@@@@@##@@@@@@@@@@@@@@@@@........................',
  '................@@@@@@@@@@@##@@@@@@@@@@@@@@@@@........................',
] as const

const GLITCH_PORTRAIT = GLITCH_PORTRAIT_LINES.join('\n')

function DocsGlitchAsciiPanel() {
  return (
    <div
      className="@container relative w-full min-w-0 overflow-hidden rounded-lg border border-white/[0.08] bg-black/90 shadow-[0_0_36px_-14px_rgba(34,211,238,0.12)]"
      style={{ contain: 'layout' }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(90deg, rgba(255,255,255,0.4) 0 1px, transparent 1px 4px),
            repeating-linear-gradient(0deg, rgba(255,255,255,0.35) 0 1px, transparent 1px 3px)
          `,
        }}
        aria-hidden
      />
      <pre
        className="relative z-[1] box-border block w-full min-w-0 overflow-x-hidden p-3 font-mono leading-[1.12] text-gray-300 motion-safe:animate-pulse whitespace-pre [font-size:clamp(0.16rem,min(2.15vw,2.8cqi),0.52rem)] [text-shadow:0_0_12px_rgba(34,211,238,0.08)] sm:p-4 sm:leading-tight"
        style={{ fontFeatureSettings: '"liga" 0' }}
      >
        {GLITCH_PORTRAIT}
      </pre>
    </div>
  )
}

export default function DocsTerminalHeader() {
  const [mounted, setMounted] = useState(false)
  const [shown, setShown] = useState('')
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [mounted])

  useEffect(() => {
    if (!mounted) return
    if (reducedMotion) {
      setShown(FULL_ART)
      return
    }
    if (shown.length >= FULL_ART.length) return
    const t = window.setTimeout(() => {
      setShown(FULL_ART.slice(0, shown.length + 1))
    }, 10)
    return () => window.clearTimeout(t)
  }, [mounted, shown, reducedMotion])

  return (
    <>
      <h1 className="sr-only">Documentation</h1>
      <div
        className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,auto)] lg:gap-10 lg:items-start select-none"
        aria-hidden="true"
      >
        <div className="order-2 min-w-0 lg:order-1">
          {!mounted ? (
            <div
              key="docs-face-skeleton"
              className="relative min-h-[14rem] w-full rounded-lg border border-white/[0.08] bg-black/90 sm:min-h-[15rem]"
              aria-hidden
            />
          ) : (
            <DocsGlitchAsciiPanel key="docs-face-live" />
          )}
        </div>
        <div className="order-1 flex min-w-0 justify-start lg:order-2 lg:justify-end">
          <pre
            className={`min-h-[5rem] min-w-0 max-w-full overflow-x-hidden font-mono leading-[1.05] tracking-normal whitespace-pre pb-1 [font-size:clamp(0.38rem,min(2.8vw,3.2cqi),0.95rem)] sm:leading-tight ${
              !mounted
                ? 'text-transparent'
                : 'text-white [text-shadow:2px_0_0_rgba(239,68,68,0.12),-2px_0_0_rgba(34,211,238,0.15),0_0_24px_rgba(34,211,238,0.08)]'
            }`}
            style={{ fontFeatureSettings: '"liga" 0' }}
          >
            {!mounted ? FULL_ART : shown}
            {mounted && shown.length < FULL_ART.length && (
              <span className="cursor-blink text-accentCyan">▌</span>
            )}
          </pre>
        </div>
      </div>
    </>
  )
}
