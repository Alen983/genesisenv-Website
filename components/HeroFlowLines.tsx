'use client'

import { useEffect, useRef, type MutableRefObject } from 'react'

type Mouse = { x: number; y: number; tx: number; ty: number }

function attachHeroFlow(
  canvasElement: HTMLCanvasElement,
  graphics: CanvasRenderingContext2D,
  mouseRef: MutableRefObject<Mouse>,
  accentRgbRef: MutableRefObject<string>,
  reducedMotionRef: MutableRefObject<boolean>,
) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotionRef.current = mq.matches

  function readAccent() {
    const raw = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim()
    accentRgbRef.current = raw ? raw.replace(/\s+/g, ', ') : '0, 255, 136'
  }
  readAccent()

  const themeObserver = new MutationObserver(readAccent)
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

  let width = 0
  let height = 0
  let dpr = 1

  function resize() {
    const parent = canvasElement.parentElement
    if (!parent) return
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    width = parent.clientWidth
    height = parent.clientHeight
    canvasElement.width = Math.max(1, Math.floor(width * dpr))
    canvasElement.height = Math.max(1, Math.floor(height * dpr))
    canvasElement.style.width = `${width}px`
    canvasElement.style.height = `${height}px`
    graphics.setTransform(dpr, 0, 0, dpr, 0, 0)
    graphics.lineJoin = 'round'
    graphics.lineCap = 'round'
  }

  const ro = new ResizeObserver(resize)
  ro.observe(canvasElement.parentElement!)
  resize()

  function onPointer(e: PointerEvent) {
    const rect = canvasElement.getBoundingClientRect()
    if (rect.width <= 0 || rect.height <= 0) return
    mouseRef.current.tx = (e.clientX - rect.left) / rect.width
    mouseRef.current.ty = (e.clientY - rect.top) / rect.height
  }

  window.addEventListener('pointermove', onPointer, { passive: true })

  let t = 0
  let raf = 0

  function drawFrame() {
    const m = mouseRef.current
    m.x += (m.tx - m.x) * 0.08
    m.y += (m.ty - m.y) * 0.08

    const mx = m.x * width
    const my = m.y * height
    const rgb = accentRgbRef.current

    graphics.clearRect(0, 0, width, height)

    const lineSpacing = Math.max(22, Math.min(32, height / 28))
    const rows = Math.ceil(height / lineSpacing) + 4
    const step = Math.max(6, Math.floor(width / 140))

    const speed = reducedMotionRef.current ? 0 : 1
    t += 0.004 * speed

    for (let i = -2; i < rows; i++) {
      const baseY = i * lineSpacing + (Math.sin(i * 0.7 + t * 0.3) * lineSpacing * 0.15)
      graphics.beginPath()
      let first = true
      for (let x = -20; x <= width + 20; x += step) {
        const wave1 = Math.sin(x * 0.0055 + t * 1.1 + i * 0.35) * 14
        const wave2 = Math.sin(x * 0.012 - t * 0.65 + i * 0.2) * 7
        let y = baseY + wave1 + wave2

        const dx = mx - x
        const dy = my - y
        const dist = Math.sqrt(dx * dx + dy * dy) + 50
        const influence = (420 * 420) / (dist * dist)
        y += dy * influence * 0.045
        y += dx * influence * 0.012

        if (first) {
          graphics.moveTo(x, y)
          first = false
        } else {
          graphics.lineTo(x, y)
        }
      }

      const alpha = 0.11 + (i % 7 === 0 ? 0.1 : 0)
      graphics.strokeStyle = `rgba(${rgb}, ${alpha})`
      graphics.lineWidth = i % 9 === 0 ? 1.45 : 1.1
      graphics.stroke()
    }

    const cols = Math.ceil(width / (lineSpacing * 1.4)) + 2
    for (let j = -1; j < cols; j++) {
      const baseX = j * lineSpacing * 1.4 + (Math.cos(j * 0.5 + t * 0.25) * 12)
      graphics.beginPath()
      let first = true
      for (let y = -20; y <= height + 20; y += step) {
        const wave1 = Math.cos(y * 0.006 + t * 0.9 + j * 0.4) * 12
        const wave2 = Math.cos(y * 0.011 - t * 0.5) * 5
        let x = baseX + wave1 + wave2

        const dx = mx - x
        const dy = my - y
        const dist = Math.sqrt(dx * dx + dy * dy) + 50
        const influence = (380 * 380) / (dist * dist)
        x += dx * influence * 0.035
        x += dy * influence * 0.01

        if (first) {
          graphics.moveTo(x, y)
          first = false
        } else {
          graphics.lineTo(x, y)
        }
      }
      graphics.strokeStyle = `rgba(${rgb}, ${0.075 + (j % 11 === 0 ? 0.09 : 0)})`
      graphics.lineWidth = j % 11 === 0 ? 1.15 : 0.95
      graphics.stroke()
    }
  }

  function loop() {
    drawFrame()
    raf = requestAnimationFrame(loop)
  }

  if (reducedMotionRef.current) {
    drawFrame()
  } else {
    raf = requestAnimationFrame(loop)
  }

  const onMotionChange = () => {
    reducedMotionRef.current = mq.matches
    cancelAnimationFrame(raf)
    if (mq.matches) {
      drawFrame()
    } else {
      raf = requestAnimationFrame(loop)
    }
  }
  mq.addEventListener('change', onMotionChange)

  return () => {
    cancelAnimationFrame(raf)
    themeObserver.disconnect()
    ro.disconnect()
    window.removeEventListener('pointermove', onPointer)
    mq.removeEventListener('change', onMotionChange)
  }
}

/** Flowing accent lines in the hero; cursor gently warps the field (canvas, theme-aware). */
export default function HeroFlowLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef<Mouse>({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 })
  const accentRgbRef = useRef('0, 255, 136')
  const reducedMotionRef = useRef(false)

  useEffect(() => {
    const el = canvasRef.current
    if (!el) return
    const g = el.getContext('2d')
    if (!g) return
    return attachHeroFlow(el, g, mouseRef, accentRgbRef, reducedMotionRef)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      aria-hidden
    />
  )
}
