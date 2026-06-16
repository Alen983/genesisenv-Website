'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

const SYSTEM_LOG = [
  { t: '10:21:17', msg: '> GET /some/unknown/path', err: false },
  { t: '10:21:17', msg: '> 404 Not Found', err: true },
  { t: '10:21:17', msg: '> Initiating recovery protocol...', err: false },
  { t: '10:21:17', msg: '> Loading mini-game.exe', err: false },
  { t: '10:21:18', msg: '> Ready.', err: false },
] as const

const LABELS = ['404', 'NULL', 'MISSING', 'ERR_ROUTE'] as const

type Drifter = {
  id: number
  x: number
  y: number
  label: (typeof LABELS)[number]
  w: number
  h: number
}

type Bolt = { id: number; x: number; y: number; vx: number; vy: number }

type Star = { x: number; y: number; c: '+' | '.' }

let idCounter = 0
const nid = () => ++idCounter

export default function NotFound404Experience() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [routes, setRoutes] = useState(0)
  const [paused, setPaused] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  const pausedRef = useRef(paused)
  const gameStartedRef = useRef(gameStarted)
  const routesRef = useRef(0)
  const killBonusRef = useRef(0)
  const lastRoutesDisplayRef = useRef(-1)
  const keysRef = useRef<Record<string, boolean>>({})
  const rafRef = useRef(0)
  const lastShotRef = useRef(0)

  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const collisionFlashUntilRef = useRef(0)

  const stateRef = useRef({
    px: 0,
    py: 0,
    vx: 0,
    vy: 0,
    drifters: [] as Drifter[],
    bolts: [] as Bolt[],
    stars: [] as Star[],
    spawnAcc: 0,
    runStart: 0,
    w: 0,
    h: 0,
  })

  useEffect(() => {
    pausedRef.current = paused
    gameStartedRef.current = gameStarted
  }, [paused, gameStarted])

  const resetRound = useCallback((canvas: HTMLCanvasElement) => {
    const s = stateRef.current
    s.w = canvas.clientWidth
    s.h = canvas.clientHeight
    s.px = s.w / 2
    s.py = s.h / 2
    s.vx = 0
    s.vy = 0
    s.drifters = []
    s.bolts = []
    s.spawnAcc = 0
    s.runStart = performance.now()
    s.stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * s.w,
      y: Math.random() * s.h,
      c: Math.random() > 0.62 ? ('+' as const) : ('.' as const),
    }))
    killBonusRef.current = 0
    routesRef.current = 0
    lastRoutesDisplayRef.current = -1
    lastShotRef.current = 0
    setRoutes(0)
  }, [])

  const startGame = useCallback(() => {
    setPaused(false)
    setGameStarted(true)
    gameStartedRef.current = true
    collisionFlashUntilRef.current = 0
    const c = canvasRef.current
    if (c) resetRound(c)
  }, [resetRound])

  const startGameRef = useRef(startGame)

  useEffect(() => {
    startGameRef.current = startGame
  }, [startGame])

  useEffect(() => {
    document.title = '404 — genesis-env'
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const s = stateRef.current
      const hadDim = s.w > 0 && s.h > 0
      s.w = w
      s.h = h
      if (!hadDim || !gameStartedRef.current) {
        s.px = w / 2
        s.py = h / 2
        if (s.stars.length === 0) {
          s.stars = Array.from({ length: 100 }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            c: Math.random() > 0.62 ? '+' : '.',
          }))
        }
      } else {
        s.px = Math.min(w - 16, Math.max(16, s.px))
        s.py = Math.min(h - 16, Math.max(16, s.py))
      }
    }

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - r.left
      mouseRef.current.y = e.clientY - r.top
      mouseRef.current.active = true
    }
    const onLeave = () => {
      mouseRef.current.active = false
    }

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return
      const r = canvas.getBoundingClientRect()
      const t = e.touches[0]
      mouseRef.current.x = t.clientX - r.left
      mouseRef.current.y = t.clientY - r.top
      mouseRef.current.active = true
    }

    const onTouch = (e: TouchEvent) => {
      if (e.touches.length === 0) return
      const r = canvas.getBoundingClientRect()
      const t = e.touches[0]
      mouseRef.current.x = t.clientX - r.left
      mouseRef.current.y = t.clientY - r.top
      mouseRef.current.active = true
    }

    const onTouchEnd = () => {
      mouseRef.current.active = false
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    wrap.addEventListener('mousemove', onMove)
    wrap.addEventListener('mouseleave', onLeave)
    wrap.addEventListener('touchstart', onTouchStart, { passive: true })
    wrap.addEventListener('touchmove', onTouch, { passive: true })
    wrap.addEventListener('touchend', onTouchEnd)

    const kd = (e: KeyboardEvent) => {
      keysRef.current[e.code] = true
      if (['Space', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.code)) {
        e.preventDefault()
      }
      if (e.code === 'Space') {
        if (!gameStartedRef.current) {
          startGameRef.current()
        } else {
          fireBolt(performance.now())
        }
      }
    }
    const ku = (e: KeyboardEvent) => {
      keysRef.current[e.code] = false
    }
    window.addEventListener('keydown', kd)
    window.addEventListener('keyup', ku)

    let last = performance.now()

    const measureDrifter = (label: string) => {
      ctx.font = '600 11px var(--font-fira-code), ui-monospace, monospace'
      const tw = ctx.measureText(label).width
      const padX = 14
      const padY = 10
      return { w: tw + padX * 2, h: 22 + padY }
    }

    const spawnDrifter = () => {
      const s = stateRef.current
      const { w, h } = s
      if (w < 80 || h < 80) return
      const label = LABELS[Math.floor(Math.random() * LABELS.length)]
      const { w: dw, h: dh } = measureDrifter(label)
      const edge = Math.floor(Math.random() * 4)
      let x = 0
      let y = 0
      if (edge === 0) {
        x = Math.random() * (w - dw) + dw / 2
        y = -dh
      } else if (edge === 1) {
        x = Math.random() * (w - dw) + dw / 2
        y = h + dh
      } else if (edge === 2) {
        x = -dw
        y = Math.random() * (h - dh) + dh / 2
      } else {
        x = w + dw
        y = Math.random() * (h - dh) + dh / 2
      }
      s.drifters.push({ id: nid(), x, y, label, w: dw, h: dh })
    }

    const hitTest = (px: number, py: number, d: Drifter) => {
      const pr = 9
      const dx = Math.abs(d.x - px)
      const dy = Math.abs(d.y - py)
      return dx < d.w / 2 + pr && dy < d.h / 2 + pr
    }

    const boltInDrifter = (bx: number, by: number, d: Drifter) => {
      const hw = d.w / 2
      const hh = d.h / 2
      return bx >= d.x - hw - 4 && bx <= d.x + hw + 4 && by >= d.y - hh - 4 && by <= d.y + hh + 4
    }

    const syncRoutesCounter = (now: number) => {
      const s = stateRef.current
      const survival = now - s.runStart
      const tTick = Math.floor(survival / 2400)
      const display = tTick + killBonusRef.current
      if (display !== lastRoutesDisplayRef.current) {
        lastRoutesDisplayRef.current = display
        routesRef.current = display
        setRoutes(display)
      }
    }

    const fireBolt = (now: number) => {
      if (!gameStartedRef.current || pausedRef.current) return
      if (now - lastShotRef.current < 200) return
      lastShotRef.current = now
      const s = stateRef.current
      let dx = 0
      let dy = -1
      const m = mouseRef.current
      if (m.active) {
        dx = m.x - s.px
        dy = m.y - s.py
      } else if (s.drifters.length > 0) {
        let best = Infinity
        for (const d of s.drifters) {
          const dd = Math.hypot(d.x - s.px, d.y - s.py)
          if (dd < best) {
            best = dd
            dx = d.x - s.px
            dy = d.y - s.py
          }
        }
      }
      const len = Math.hypot(dx, dy) || 1
      dx /= len
      dy /= len
      s.bolts.push({ id: nid(), x: s.px, y: s.py, vx: dx, vy: dy })
    }

    const onCanvasClick = () => {
      const t = performance.now()
      if (!gameStartedRef.current) {
        startGameRef.current()
      } else {
        fireBolt(t)
      }
    }
    wrap.addEventListener('click', onCanvasClick)

    const loop = (now: number) => {
      const dt = Math.min(28, now - last)
      last = now
      const s = stateRef.current
      const { w, h } = s
      const accentRgb =
        getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb-channels').trim() ||
        '0, 255, 136'

      ctx.fillStyle = '#030303'
      ctx.fillRect(0, 0, w, h)

      for (const st of s.stars) {
        ctx.fillStyle = st.c === '+' ? 'rgba(250,250,250,0.22)' : 'rgba(180,180,190,0.12)'
        ctx.font = '9px monospace'
        ctx.fillText(st.c, st.x, st.y)
      }

      const playing = gameStartedRef.current && !pausedRef.current

      if (playing) {
        const survival = now - s.runStart
        syncRoutesCounter(now)

        const m = mouseRef.current
        let tx = s.px
        let ty = s.py
        if (m.active) {
          tx = m.x
          ty = m.y
        }
        const ax =
          (tx - s.px) * 0.0018 +
          (keysRef.current['ArrowLeft'] ? -1 : 0) * 0.55 +
          (keysRef.current['ArrowRight'] ? 1 : 0) * 0.55
        const ay =
          (ty - s.py) * 0.0018 +
          (keysRef.current['ArrowUp'] ? -1 : 0) * 0.55 +
          (keysRef.current['ArrowDown'] ? 1 : 0) * 0.55
        s.vx = s.vx * 0.88 + ax * dt * 0.14
        s.vy = s.vy * 0.88 + ay * dt * 0.14
        const cap = 0.42 * dt
        s.vx = Math.max(-cap, Math.min(cap, s.vx))
        s.vy = Math.max(-cap, Math.min(cap, s.vy))
        s.px += s.vx * dt * 0.22
        s.py += s.vy * dt * 0.22
        s.px = Math.max(12, Math.min(w - 12, s.px))
        s.py = Math.max(12, Math.min(h - 12, s.py))

        const runSecs = survival / 1000
        const spawnEvery = Math.max(520, 2200 - runSecs * 28)
        s.spawnAcc += dt
        while (s.spawnAcc > spawnEvery) {
          s.spawnAcc -= spawnEvery
          spawnDrifter()
        }

        const speed = 0.022 + Math.min(0.035, runSecs * 0.0011)
        for (const d of s.drifters) {
          const dx = s.px - d.x
          const dy = s.py - d.y
          const len = Math.hypot(dx, dy) || 1
          d.x += (dx / len) * speed * dt
          d.y += (dy / len) * speed * dt
        }

        const boltSpeed = 0.5
        for (const b of s.bolts) {
          b.x += b.vx * boltSpeed * dt
          b.y += b.vy * boltSpeed * dt
        }
        s.bolts = s.bolts.filter((b) => b.x > -48 && b.x < w + 48 && b.y > -48 && b.y < h + 48)

        for (const bolt of [...s.bolts]) {
          const hit = s.drifters.find((d) => boltInDrifter(bolt.x, bolt.y, d))
          if (hit) {
            s.bolts = s.bolts.filter((x) => x.id !== bolt.id)
            s.drifters = s.drifters.filter((x) => x.id !== hit.id)
            killBonusRef.current += 1
            syncRoutesCounter(now)
          }
        }

        for (const d of [...s.drifters]) {
          if (hitTest(s.px, s.py, d)) {
            collisionFlashUntilRef.current = now + 260
            s.drifters = []
            s.bolts = []
            gameStartedRef.current = false
            setGameStarted(false)
            setPaused(false)
            break
          }
        }

        s.drifters = s.drifters.filter((d) => d.x > -80 && d.x < w + 80 && d.y > -80 && d.y < h + 80)
      }

      for (const d of s.drifters) {
        ctx.save()
        ctx.translate(d.x, d.y)
        ctx.fillStyle = 'rgba(12,12,14,0.92)'
        ctx.strokeStyle = 'rgba(120,120,135,0.45)'
        ctx.lineWidth = 1
        const hw = d.w / 2
        const hh = d.h / 2
        ctx.fillRect(-hw, -hh, d.w, d.h)
        ctx.strokeRect(-hw + 0.5, -hh + 0.5, d.w - 1, d.h - 1)
        ctx.fillStyle = 'rgba(220,220,230,0.88)'
        ctx.font = '600 11px var(--font-fira-code), ui-monospace, monospace'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(d.label, 0, 0)
        ctx.restore()
      }

      for (const b of s.bolts) {
        ctx.save()
        ctx.strokeStyle = `rgba(${accentRgb}, 0.72)`
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(b.x - b.vx * 8, b.y - b.vy * 8)
        ctx.lineTo(b.x + b.vx * 14, b.y + b.vy * 14)
        ctx.stroke()
        ctx.restore()
      }

      const pulse = 0.55 + Math.sin(now / 420) * 0.12
      ctx.save()
      ctx.translate(s.px, s.py)
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 22)
      g.addColorStop(0, `rgba(${accentRgb},${0.35 * pulse})`)
      g.addColorStop(0.45, `rgba(${accentRgb},${0.12 * pulse})`)
      g.addColorStop(1, `rgba(${accentRgb},0)`)
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(0, 0, 22, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = 'rgba(240,255,248,0.95)'
      ctx.beginPath()
      ctx.arc(0, 0, 4.2, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = `rgba(${accentRgb}, 0.5)`
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.restore()

      if (now < collisionFlashUntilRef.current) {
        const t = 1 - (collisionFlashUntilRef.current - now) / 260
        ctx.fillStyle = `rgba(180, 60, 70, ${0.14 * (1 - t)})`
        ctx.fillRect(0, 0, w, h)
        ctx.strokeStyle = `rgba(255,255,255,${0.06 * (1 - t)})`
        ctx.lineWidth = 1
        ctx.strokeRect(0.5, 0.5, w - 1, h - 1)
      }

      if (!gameStartedRef.current) {
        ctx.fillStyle = 'rgba(0,0,0,0.42)'
        ctx.fillRect(0, 0, w, h)
        ctx.fillStyle = 'rgba(228,228,231,0.9)'
        ctx.font = '12px var(--font-fira-code), monospace'
        ctx.textAlign = 'center'
        ctx.fillText('Move with pointer or arrows · Space or click to begin', w / 2, h / 2 - 8)
        ctx.fillStyle = 'rgba(161,161,170,0.85)'
        ctx.font = '11px var(--font-fira-code), monospace'
        ctx.fillText('Pointer · arrows to move · Space or click to clear fragments', w / 2, h / 2 + 14)
      } else if (pausedRef.current) {
        ctx.fillStyle = 'rgba(0,0,0,0.35)'
        ctx.fillRect(0, 0, w, h)
        ctx.fillStyle = 'rgba(250,250,250,0.9)'
        ctx.font = '600 12px var(--font-fira-code), monospace'
        ctx.textAlign = 'center'
        ctx.fillText('Paused', w / 2, h / 2)
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      wrap.removeEventListener('mousemove', onMove)
      wrap.removeEventListener('mouseleave', onLeave)
      wrap.removeEventListener('touchstart', onTouchStart)
      wrap.removeEventListener('touchmove', onTouch)
      wrap.removeEventListener('touchend', onTouchEnd)
      wrap.removeEventListener('click', onCanvasClick)
      window.removeEventListener('keydown', kd)
      window.removeEventListener('keyup', ku)
    }
  }, [])

  return (
    <div className="min-h-[calc(100dvh-3.5rem)] bg-background pt-14 font-mono text-foreground">
      <div className="mx-auto flex max-w-[1720px] min-h-[calc(100dvh-8rem)] flex-col gap-4 px-4 pb-10 sm:flex-row sm:gap-5 sm:px-8 lg:px-12">
        <aside className="flex w-full shrink-0 flex-col gap-5 rounded-lg border border-border/60 bg-card p-5 sm:max-w-[320px] sm:self-start sm:p-6 dark:border-white/[0.1] dark:bg-zinc-950/80">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-red-500">Error 404</p>
            <h1 className="mt-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl">PAGE NOT FOUND</h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Looks like you&apos;ve wandered off into uncharted territory. Let&apos;s get you back.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3">
            <button
              type="button"
              onClick={startGame}
              className="border border-border bg-muted px-3 py-2 text-left text-xs uppercase tracking-[0.18em] text-foreground hover:border-accent hover:text-accent dark:border-white/20 dark:bg-black dark:text-zinc-200"
            >
              [ &gt; PLAY GAME ]
            </button>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">or</span>
            <Link
              href="/"
              className="border border-border bg-muted px-3 py-2 text-xs uppercase tracking-[0.18em] text-foreground transition-colors hover:border-foreground/40 hover:text-foreground dark:border-white/20 dark:bg-black dark:text-zinc-200 dark:hover:border-white/40 dark:hover:text-white"
            >
              [ &gt; GO HOME ]
            </Link>
          </div>

          <details className="group border-t border-border/60 pt-4 dark:border-white/[0.08]" open>
            <summary className="cursor-pointer list-none text-[11px] uppercase tracking-[0.22em] text-muted-foreground marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="inline-flex items-center gap-2">
                <span className="inline-block text-muted-foreground/80 transition-transform group-open:rotate-90 dark:text-zinc-600">
                  ▸
                </span>
                System log
              </span>
            </summary>
            <ul className="mt-3 space-y-1.5 font-mono text-[11px] leading-relaxed text-muted-foreground">
              {SYSTEM_LOG.map((line, i) => (
                <li key={i}>
                  <span className="text-muted-foreground/80 dark:text-zinc-600">{line.t}</span>{' '}
                  <span className={line.err ? 'text-red-400' : ''}>{line.msg}</span>
                </li>
              ))}
            </ul>
          </details>
        </aside>

        {/* Dark stage: canvas colors/game logic assume a near-black field */}
        <section className="flex min-h-[min(56vh,480px)] flex-1 flex-col overflow-hidden rounded-lg border border-border bg-[#050505] shadow-sm dark:border-white/[0.08]">
          <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-3 py-2.5 sm:px-4">
            <p className="text-[10px] uppercase tracking-[0.22em] text-zinc-500 sm:text-[11px]">
              Routes recovered: <span className="font-medium text-zinc-100 tabular-nums">{routes}</span>
            </p>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              disabled={!gameStarted}
              className="shrink-0 rounded border border-white/12 px-2 py-1 text-xs text-zinc-500 hover:border-white/25 hover:text-zinc-200 disabled:pointer-events-none disabled:opacity-30"
              aria-label={paused ? 'Resume' : 'Pause'}
            >
              ‖
            </button>
          </div>

          <div ref={wrapRef} className="relative min-h-0 flex-1 cursor-crosshair">
            <canvas ref={canvasRef} className="block h-full min-h-[280px] w-full touch-none" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-white/[0.06] px-3 py-2.5 text-[10px] uppercase tracking-[0.16em] text-zinc-600 sm:gap-x-5 sm:text-[11px]">
            <span>Pointer</span>
            <span className="text-zinc-700">·</span>
            <span className="inline-flex items-center gap-1">
              <kbd className="rounded border border-white/15 px-1.5 py-0.5">←</kbd>
              <kbd className="rounded border border-white/15 px-1.5 py-0.5">→</kbd>
              <kbd className="rounded border border-white/15 px-1.5 py-0.5">↑</kbd>
              <kbd className="rounded border border-white/15 px-1.5 py-0.5">↓</kbd>
            </span>
            <span className="text-zinc-700">·</span>
            <span className="inline-flex items-center gap-1.5 normal-case">
              <kbd className="rounded border border-white/15 px-1.5 py-0.5">Space</kbd>
              <span className="text-zinc-500">/</span>
              <span>click</span>
            </span>
          </div>
        </section>
      </div>

      <p className="mx-auto max-w-[1720px] px-4 pb-6 text-center text-[11px] text-muted-foreground sm:px-8 lg:px-12 sm:text-xs">
        Tip: You can always go back{' '}
        <Link href="/" className="text-accent underline decoration-accent/35 underline-offset-2 hover:decoration-accent">
          home
        </Link>
        . We won&apos;t tell anyone.
      </p>
    </div>
  )
}
